import pickle
import pandas as pd
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from flask import Flask, jsonify
from bson import ObjectId
from scipy.sparse import load_npz
from sklearn.metrics.pairwise import cosine_similarity

with open('movies_data.pkl', 'rb') as f:
    old_movies = pickle.load(f)
old_movies_df = pd.DataFrame(old_movies)
old_movies_df['_id'] = old_movies_df['_id'].astype(str)

movie_ids = old_movies_df['_id'].tolist()

vectors = load_npz("vectors.npz")

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME_2 = os.getenv("COLLECTION_NAME_2")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection2 = db[COLLECTION_NAME_2]

from flask_cors import CORS

app = Flask(__name__)
allowed_origin = os.getenv("CORS_ORIGIN", "*") 
CORS(app, origins=allowed_origin)


def convert(user_doc):
    return pd.DataFrame([{
        "_id": str(user_doc["_id"]),
        "favorites": [str(x) for x in user_doc.get("favorites", [])],
        "likes": [str(x) for x in user_doc.get("likes", [])],
    }])

def recommend_movies(user_vector, excluded_indices, top_n=5):
    candidate_vectors = vectors[~excluded_indices]
    similarity = cosine_similarity(user_vector, candidate_vectors)
    top_indices = similarity[0].argsort()[::-1][:top_n]
    movie_indices = (~excluded_indices).nonzero()[0][top_indices]
    recommendations = old_movies_df.iloc[movie_indices]
    return [
        {
            '_id': str(row['_id']),
            'title': row['title'],
            'genres': row.get('genres', []),
            'poster': row.get('poster', "")
        }
        for _, row in recommendations.iterrows()
    ]

@app.route('/recommend/<user_id>', methods=['GET'])
def recommend(user_id):
    user_id = ObjectId(user_id)
    user_cursor = collection2.find_one({"_id": user_id})
    user = convert(user_cursor)
    liked_ids_str = user['likes'].iloc[0]
    favourite_ids_str = user['favorites'].iloc[0]
    if not liked_ids_str and not favourite_ids_str:
        return jsonify("You have not Liked or Favorited any Movies yet. Returning empty recommendations.", [])
    
    liked_indices = [movie_ids.index(mid) for mid in liked_ids_str if mid in movie_ids]
    favourite_indices = [movie_ids.index(mid) for mid in favourite_ids_str if mid in movie_ids]
    all_indices = liked_indices + favourite_indices

    if not all_indices:
        return jsonify("No valid liked or favorite movie IDs found in database.", [])
    vectors_to_average = []
    if liked_indices:
        vectors_to_average.append(vectors[liked_indices].mean(axis=0))
    if favourite_indices:
        vectors_to_average.append(vectors[favourite_indices].mean(axis=0))
    user_profile_vector = sum(vectors_to_average) / len(vectors_to_average)
    user_profile_vector = user_profile_vector.A  

    excluded_indices = pd.Series(movie_ids).isin(liked_ids_str + favourite_ids_str).values
    recommendations = recommend_movies(user_profile_vector, excluded_indices)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run()
