import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  const { data: cart, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        {isPending && (
          <div>
            <Loader2 className="text-primary animate-spin" />
          </div>
        )}
        {cart?.items.map((item) => (
          <div key={item.id}>
            <Image
              src={item.productVariant.imageUrl}
              alt={item.productVariant.product.description}
              width={100}
              height={100}
            />
            <div>
              <h3>{item.productVariant.product.name}</h3>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
