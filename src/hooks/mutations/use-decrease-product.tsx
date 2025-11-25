import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseProductItemQuantity } from "@/actions/decrease-cart-item-quantity";

import { getCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) => [
  "decrease-cart-product-quantity",
  cartItemId,
];

export const useDecreaseQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseProductItemQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartQueryKey() });
    },
  });
};
