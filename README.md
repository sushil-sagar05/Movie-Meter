🎬 Moviemeter – Personalized Movie Recommendation Web App

Moviemeter is a full-stack web application that lets users discover, review, and discuss movies — while also receiving personalized recommendations based on their preferences. It’s powered by a custom-built content-based recommender system using Python, scikit-learn, and MongoDB.


---

🚀 Features

👤 Authentication

Secure user signup & login system

Authenticated access to personalized content


❤ User Interactions

Like & favorite movies

Write reviews and view others’ opinions

Engage in threaded movie discussions


🧠 Personalized Recommendations

Content-based recommender using:

Movie vectors (genres, metadata)

Cosine similarity with user profile vector


Built with Python, pandas, and scikit-learn


🌐 Tech Stack

Frontend: React, Tailwind CSS

Backend: Express.js for app APIs, Flask for ML API

Database: MongoDB (with Mongoose ODM)

AI/ML: Python, Pandas, Scikit-learn

Deployment: Deployed on [Railway/Render/Vercel/etc.]

---

📂 Folder Structure

moviemeter/
│
├── frontend/              # React.js frontend
├── backend/               # Express.js API backend
├── recommender/           # Flask-based ML microservice
│   ├── final_df_data.pkl.gz
│   ├── movies_data.pkl
│   └── recommender.py
├── .env                   # Environment variables
└── README.md


---

⚙ Setup Instructions

1. Clone the Repository

git clone https://github.com/sushil-sagar05/moviemeter.git
cd moviemeter

2. Setup Frontend (React.js)

cd frontend
npm install
npm run dev

3. Setup Backend (Express.js)

cd ../backend
npm install
npm run dev

4. Setup ML Recommender (Flask)

cd ../recommender
pip install -r requirements.txt
python recommender.py

Ensure .env files are present in backend and recommender directories with MongoDB credentials.


---

🧠 How Recommendations Work

1. User likes/favorites some movies


2. Flask service fetches their liked movie vectors


3. A user profile vector is created by averaging the liked vectors


4. Cosine similarity compares this profile with all other movies


5. Top results (excluding already liked) are returned




---

✅ Current Status

[x] Frontend UI with user interactions

[x] Backend APIs with authentication & review handling

[x] ML model deployed via Flask API

[x] Hosted and live

[ ] (Coming Soon): Docker + CI/CD DevOps integration

---

👨‍💻 Author

Sushil Sagar
B.Tech | AI/ML + Full Stack Developer | Passionate about building end-to-end intelligent applications
📫 Connect on LinkedIn: https://www.linkedin.com/in/sushil-sagar-0b4538290/
🌐 Portfolio: Coming soon...


---

⭐ If you like this project

Give this repo a star ⭐ and share your thoughts. Contributions, suggestions, or feedback are always welcome!
