import { initLogger } from "braintrust";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { InventoryRecommendationSchema } from "./schema.js";

const logger = initLogger({ projectId: "Grocery-Inventory-Optimizer" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function runInventoryAgent(inventoryData: any, wasteLogs: any) {
  // Start a trace in Braintrust
  return await logger.traced(async (span) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      You are an inventory optimization agent. 
      Current Inventory: ${JSON.stringify(inventoryData)}
      Past 7-day Waste Logs: ${JSON.stringify(wasteLogs)}
      
      Analyze the trend. If waste is high, decrease order quantity. 
      Output JSON matching the schema.
    `;

    span.log({ input: { inventoryData, wasteLogs } });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse and validate the recommendation
    const recommendation = InventoryRecommendationSchema.parse(JSON.parse(responseText));

    span.log({ output: recommendation });
    return recommendation;
  });
}