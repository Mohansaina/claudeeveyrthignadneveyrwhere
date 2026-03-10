// Use fetch to list models directly
const API_KEY = "AIzaSyDaH2eOeMLiXLZEh2djzikX_eETvklOPfo";

async function listModels() {
    try {
        console.log("Fetching models...");
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
