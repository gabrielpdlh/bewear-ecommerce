import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { decreaseProductItemQuantity } from "@/actions/decrease-cart-item-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantTotalPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantImageUrl,
  productVariantName,
  productVariantTotalPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto removido do carrinho");
    },
  });
  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseProductItemQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const handledecreaseCartProductQuantity = () =>
    decreaseCartProductQuantityMutation.mutate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              onClick={() => {
                handledecreaseCartProductQuantity();
              }}
              variant="ghost"
              className="h-4 w-4"
            >
              <MinusIcon />
            </Button>
            {quantity}
            <Button onClick={() => {}} variant="ghost" className="h-4 w-4">
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button onClick={() => mutate()} variant="outline" size="icon">
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantTotalPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
