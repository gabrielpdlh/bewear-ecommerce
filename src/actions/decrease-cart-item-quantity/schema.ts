import z from "zod";

export const decreaseProductItemQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseProductItemQuantitySchema = z.infer<
  typeof decreaseProductItemQuantitySchema
>;
