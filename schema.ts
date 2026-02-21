import { z } from "zod";

export const InventoryRecommendationSchema = z.object({
  productId: z.string(),
  recommendedOrderQuantity: z.number(),
  reasoning: z.string(),
  riskLevel: z.enum(["Low", "Medium", "High"]),
  predictedWastePercent: z.number()
});

export type InventoryRecommendation = z.infer<typeof InventoryRecommendationSchema>;