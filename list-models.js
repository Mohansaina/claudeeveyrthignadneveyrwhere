import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || "AIzaSyDaH2eOeMLiXLZEh2djzikX_eETvklOPfo"; // Defaulting to the one in gemini.js just in case

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        console.log("Fetching models...");
        // Hacky way to get models, as the SDK doesn't have a direct listModels sometimes or it might be undocumented in this older version
        // Actually, let's use the REST API directly since we just need to know what's there
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available models:");
            data.models.forEach(model => {
                if (model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${model.name}`);
                }
            });
        } else {
            console.log("No models found or error parsing:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
