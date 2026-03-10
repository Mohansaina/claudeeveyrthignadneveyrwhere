import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI SDK with your API key
// Using environment variables for better security
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || process.env?.REACT_APP_GEMINI_API_KEY || "AIzaSyDaH2eOeMLiXLZEh2djzikX_eETvklOPfo";

export const genAI = new GoogleGenerativeAI(API_KEY);

// Export a configured model instance (e.g., gemini-1.5-flash-latest) for easy use across your app
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
