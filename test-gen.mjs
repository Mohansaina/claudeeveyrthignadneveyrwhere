import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDaH2eOeMLiXLZEh2djzikX_eETvklOPfo";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGenerate() {
    try {
        console.log("Testing text generation with gemini-2.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(
            `Generate a React component using Tailwind CSS.

User request:
a colorful button

Return only the React component code.`
        );
        console.log("--- SUCCESS! API RESPONSE ---");
        console.log(result.response.text());
    } catch (error) {
        console.error("--- ERROR DURING GENERATION ---");
        console.error(error);
    }
}

testGenerate();
