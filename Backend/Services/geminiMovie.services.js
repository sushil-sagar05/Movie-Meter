const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const redisClient = require("../redisClient");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

const getMovieOverview = async (movieName) => {
  const cacheKey = `movie:${movieName}`;

  try {
    try {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log(" Cache Hit");
        return cached;
      }
    } catch {
      console.warn(" Redis not available");
    }

    console.log(" Fetching from Gemini...");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a film critic providing a detailed overview of the ${movieName}...`,
    });

    const movieOverview =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!movieOverview) {
      throw new Error("Empty Gemini response");
    }

    try {
      await redisClient.setEx(cacheKey, 86400, movieOverview);
    } catch {}

    return movieOverview;

  } catch (error) {
    console.error(" Gemini Service Error:", error);
    throw error;
  }
};

module.exports = { getMovieOverview };
