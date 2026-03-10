import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("VITE_GEMINI_API_KEY is not defined in the environment variables. Prompt enhancement will fail.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function enhancePrompt(shortPrompt) {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemInstruction = `
You are an expert Frontend Developer and UI/UX Designer. The user will provide a short, simple idea for a React component. 
Your goal is to expand this short idea into a highly detailed, professional prompt that will later be used by another AI to generate the actual code.

The enhanced prompt MUST include requirements for:
1. **Aesthetics & UI**: Specify modern design trends, color palettes, gradients, shadows, and layout structures (e.g., glassmorphism, clean minimalistic, vibrant, dark mode).
2. **Responsiveness**: Explicitly require Tailwind classes for mobile, tablet, and desktop views.
3. **Interactivity**: Specify precise hover states, focus rings, transitions, and micro-animations.
4. **Icons**: Suggest specific icons from the \`lucide-react\` library.

Output ONLY the enhanced prompt text. Do not include introductory phrases or explanations. The output should read as a direct command to a developer. Let the enhanced prompt be around 100-200 words.
`;

    const fullPrompt = `${systemInstruction}\n\nUser Idea: ${shortPrompt}`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        return text.trim();
    } catch (error) {
        console.error("Error enhancing prompt:", error);
        throw error;
    }
}
