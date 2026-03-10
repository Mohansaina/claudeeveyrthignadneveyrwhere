import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGenerationPrompt } from "../prompts/generation.tsx";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function cleanCode(text) {
    return text.replace(/^```(?:jsx?|tsx?|react)?\n?/i, '').replace(/```$/, '').trim();
}

export async function generateComponent(prompt, onChunk) {
    const fullPrompt = getGenerationPrompt(prompt);

    if (onChunk) {
        const result = await model.generateContentStream(fullPrompt);
        let accumulated = '';
        for await (const chunk of result.stream) {
            accumulated += chunk.text();
            onChunk(cleanCode(accumulated));
        }
        return cleanCode(accumulated);
    }

    const result = await model.generateContent(fullPrompt);
    return cleanCode(result.response.text());
}
