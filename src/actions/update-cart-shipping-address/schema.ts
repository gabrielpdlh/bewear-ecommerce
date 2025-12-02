import z from "zod";

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.uuid(),
});

export type UpdateCartShippingAddress = z.infer<
  typeof updateCartShippingAddressSchema
>;
