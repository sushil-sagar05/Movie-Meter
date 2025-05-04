import pickle
import pandas as pd
from dotenv import load_dotenv
import os
import sys
from pymongo import MongoClient
from flask import Flask,jsonify
import gzip
with open('movies_data.pkl','rb') as f:
   old_movies = pickle.load(f)
with gzip.open('final_df_data.pkl.gz', 'rb') as f:
    final_df = pickle.load(f)
load_dotenv()
MONGO_URI=os.getenv("MONGO_URI")
DB_NAME=os.getenv("DB_NAME")
COLLECTION_NAME_2=os.getenv("COLLECTION_NAME_2")
client = MongoClient(MONGO_URI)
db=client[DB_NAME]
collection2 = db[COLLECTION_NAME_2]
from bson import ObjectId
app=Flask(__name__)

def convert(user_doc):
    flat_user = {
    "_id": str(user_doc["_id"]),
    "favorites": [str(x) for x in user_doc.get("favorites", [])],
    "likes": [str(x) for x in user_doc.get("likes", [])],
    }
    return pd.DataFrame([flat_user])
def fetch_from_movie_vector(liked_ids, movie_vector_df):
    return movie_vector_df[movie_vector_df['_id'].isin(liked_ids)]
def filteredMovies(movieId,old_movies_df):
    if isinstance(movieId, str): 
        movieId = [movieId]
    Filtered = old_movies_df[~old_movies_df['_id'].isin(movieId)]
    return Filtered
def recommendMovie(movieId,liked_vector_list, user_profile_vector, Movie_vector_excluding_ids_Title, old_movies_df):
    L=[]
    from sklearn.metrics.pairwise import cosine_similarity
    similarity = cosine_similarity(user_profile_vector,Movie_vector_excluding_ids_Title )
    if not movieId:
        return L
    filtered_movies = filteredMovies(movieId,old_movies_df)
    movie_list = sorted(list(enumerate(similarity[0])),reverse=True,key=lambda x:x[1])[1:6]
    topindices=[i[0] for i in movie_list]
    for i in topindices[:min(5, len(topindices))]:
        row = filtered_movies.iloc[i]
        L.append({'_id':str(row['_id']),'title': row['title'], 'genres': row['genres'],'poster':row['poster']})
    return L

@app.route('/recommend/<user_id>',methods=['GET'])
def recommend(user_id):
    user_id = ObjectId(user_id)
    user_cursor = collection2.find_one({"_id":user_id})
    old_movies_df = pd.DataFrame(old_movies)
    user = convert(user_cursor)
    favorites_ids = [ObjectId(x) for x in user['favorites'].iloc[0]]
    liked_ids = [ObjectId(x) for x in user['likes'].iloc[0]]
    liked_vector_list = fetch_from_movie_vector(liked_ids,final_df)
    if liked_vector_list.empty:
        print("You have not Liked any Movies yet. Returning empty recommendations.")
        return jsonify("You have not Liked any Movies yet. Returning empty recommendations.",[])
    vector_for_mean = liked_vector_list[[col for col in liked_vector_list.columns if col not in ['_id','title']]]
    user_profile_vector = vector_for_mean.mean(axis=0).values.reshape(1, -1)
    Movie_vector_excluding_liked_ids = final_df[~final_df['_id'].isin(liked_ids)]
    Movie_vector_excluding_ids_Title = Movie_vector_excluding_liked_ids[[col for col in Movie_vector_excluding_liked_ids.columns if col not in ['_id','title']]]
    return jsonify(recommendMovie(liked_ids, liked_vector_list, user_profile_vector, Movie_vector_excluding_ids_Title, old_movies_df))

if __name__ == "__main__":
    app.run(debug=True)