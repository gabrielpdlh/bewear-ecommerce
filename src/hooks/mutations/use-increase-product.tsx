import { useMutation, useQueryClient } from "@tanstack/react-query";

import { increaseProductItemQuantity } from "@/actions/increase-cart-product";

import { getCartQueryKey } from "../queries/use-cart";

export const getIncreaseProductMutationKey = (cartItemId: string) => [
  "increase-cart-product",
  cartItemId,
];

export const useIncreaseProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseProductMutationKey(cartItemId),
    mutationFn: () => increaseProductItemQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartQueryKey() });
    },
  });
};
