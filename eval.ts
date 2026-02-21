import { Eval } from "braintrust";
import { NumericDiff } from "autoevals";
import { runInventoryAgent } from "./agent.js";

Eval("Inventory-Optimization-v1", {
  data: () => [
    {
      input: { stock: 100, sales: 20, priorWaste: 30 },
      expected: 15, // The "Golden" order quantity
    },
  ],
  task: async (input) => {
    const res = await runInventoryAgent(input, []);
    return res.recommendedOrderQuantity;
  },
  scores: [NumericDiff], // Compares how close the agent got to the ideal number
});