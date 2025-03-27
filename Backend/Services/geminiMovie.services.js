const { GoogleGenAI }= require("@google/genai");
require("dotenv").config();
const redisClient = require("../redisClient");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

module.exports = {
    getMovieOverview: async function(movieName) {
        const cacheKey = `movie:${movieName}`;
    
     try {
        const cachedOverview = await redisClient.get(cacheKey);
        if (cachedOverview) {
          console.log(" Cache Hit! Returning from Redis...");
          return cachedOverview; 
        }
        console.log("🔄 Cache Miss! Fetching from Gemini AI...");
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `You are a film critic providing a detailed overview of the ${movieName} Describe the world in which the story is set and its unique rules or constraints. Introduce the central question or mystery that drives the plot forward. Outline the various obstacles and adversaries that the main characters encounter as they seek answers. Conclude by emphasizing the growing uncertainties and unanswered questions that loom large, creating suspense and anticipation for the eventual resolution without revealing the solution or the ending.`,
          });
          const movieOverview = response.candidates[0].content.parts[0].text;
          await redisClient.setEx(cacheKey, 86400, movieOverview);
    
          return movieOverview;
     } catch (error) {
        throw error;
     }
    }
    
};