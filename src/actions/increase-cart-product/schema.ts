import z from "zod";

export const increaseProductItemQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type IncreaseProductItemQuantitySchema = z.infer<
  typeof increaseProductItemQuantitySchema
>;
