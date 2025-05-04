import pickle
import pandas as pd
import os
import gzip
from pymongo import MongoClient
from flask import Flask, jsonify
from bson import ObjectId
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import logging
import gc

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME_2 = os.getenv("COLLECTION_NAME_2")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection2 = db[COLLECTION_NAME_2]

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

def load_old_movies(liked_ids):
    file_path = 'movies_data.pkl'
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} not found in the deployed environment.")
    
    with open(file_path, 'rb') as f:
        movies_data = pickle.load(f)

    if isinstance(movies_data, pd.DataFrame):
        return movies_data[movies_data['_id'].isin(liked_ids)]
    else:
        raise ValueError("Data is not in the expected format. Expected a pandas DataFrame.")

def load_final_df():
    file_path = 'final_df_data.pkl.gz'
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} not found in the deployed environment.")
    
    with gzip.open(file_path, 'rb') as f:
        return pickle.load(f)

def convert(user_doc):
    return pd.DataFrame([{
        "_id": str(user_doc["_id"]),
        "favorites": [str(x) for x in user_doc.get("favorites", [])],
        "likes": [str(x) for x in user_doc.get("likes", [])],
    }])

def fetch_from_movie_vector(liked_ids, movie_vector_df):
    return movie_vector_df[movie_vector_df['_id'].isin(liked_ids)]

def filteredMovies(movieId, old_movies_df):
    if isinstance(movieId, str):
        movieId = [movieId]
    return old_movies_df[~old_movies_df['_id'].isin(movieId)]

def recommendMovie(movieId, liked_vector_list, user_profile_vector, movie_vector_titles, old_movies_df):
    if not movieId:
        return []

    filtered_movies = filteredMovies(movieId, old_movies_df)
    similarity = cosine_similarity(user_profile_vector, movie_vector_titles)

    movie_list = sorted(
        list(enumerate(similarity[0])),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    top_indices = [i[0] for i in movie_list]
    recommendations = []
    for i in top_indices[:min(5, len(top_indices))]:
        row = filtered_movies.iloc[i]
        recommendations.append({
            '_id': str(row['_id']),
            'title': row['title'],
            'genres': row['genres'],
            'poster': row['poster']
        })
    return recommendations

@app.route('/recommend/<user_id>', methods=['GET'])
def recommend(user_id):
    logging.debug(f"Received request for user_id: {user_id}")
    try:
        user_id = ObjectId(user_id)
        user_cursor = collection2.find_one({"_id": user_id})
        if not user_cursor:
            logging.error(f"User {user_id} not found.")
            return jsonify({"error": "User not found"}), 404

        logging.debug(f"User found: {user_cursor}")
        user = convert(user_cursor)
        favorites_ids = [ObjectId(x) for x in user['favorites'].iloc[0]]
        liked_ids = [ObjectId(x) for x in user['likes'].iloc[0]]

        logging.debug(f"Favorites and likes loaded: {favorites_ids}, {liked_ids}")
        
        old_movies = load_old_movies(liked_ids)
        final_df = load_final_df()

        logging.debug("Old movies and final DataFrame loaded.")
        
        old_movies_df = pd.DataFrame(old_movies)
        liked_vector_list = fetch_from_movie_vector(liked_ids, final_df)

        if liked_vector_list.empty:
            logging.warning("No liked movies found.")
            return jsonify("You have not liked any movies yet.", [])

        logging.debug("Liked movies vectors found.")

        vector_cols = [col for col in final_df.columns if col not in ['_id', 'title']]
        user_profile_vector = liked_vector_list[vector_cols].mean(axis=0).values.reshape(1, -1)

        movie_vector_excluding = final_df[~final_df['_id'].isin(liked_ids)]
        movie_vector_titles = movie_vector_excluding[vector_cols]

        gc.collect()

        recommendations = recommendMovie(liked_ids, liked_vector_list, user_profile_vector, movie_vector_titles, old_movies_df)
        logging.debug(f"Recommendations generated: {recommendations}")
        
        return jsonify(recommendations)
    except Exception as e:
        logging.error(f"Error while processing request: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))  
    app.run(host="0.0.0.0", port=port)
