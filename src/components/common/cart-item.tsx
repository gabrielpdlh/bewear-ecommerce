import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseQuantity } from "@/hooks/mutations/use-decrease-product";
import { useIncreaseProduct } from "@/hooks/mutations/use-increase-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-products-from-cart";

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
  const removeProductFromCart = useRemoveProductFromCart(id);
  const handleDeleteClick = () => {
    removeProductFromCart.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  const decreaseCartProductQuantityMutation = useDecreaseQuantity(id);
  const handleDecreaseCartProductQuantity = () =>
    decreaseCartProductQuantityMutation.mutate();

  const increaseCartProductQuantityMutation = useIncreaseProduct(id);
  const handleIncreaseCartProductQuantity = () =>
    increaseCartProductQuantityMutation.mutate();

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
              onClick={handleDecreaseCartProductQuantity}
              variant="ghost"
              className="h-4 w-4"
            >
              <MinusIcon />
            </Button>
            {quantity}
            <Button
              onClick={handleIncreaseCartProductQuantity}
              variant="ghost"
              className="h-4 w-4"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button
          onClick={() => handleDeleteClick()}
          variant="outline"
          size="icon"
        >
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
