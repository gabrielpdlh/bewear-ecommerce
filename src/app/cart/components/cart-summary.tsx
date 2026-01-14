"use client";

import Image from "next/image";

import CartItem from "@/components/common/cart-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

interface CartSummaryProps {
  cartTotalInCents?: number;
  cartItems?: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({ cartTotalInCents, cartItems }: CartSummaryProps) => {
  const { data: cart } = useCart();
  
  // Usa props se fornecidas, caso contrário usa dados do hook
  const items = cartItems ?? cart?.items ?? [];
  const totalInCents = cartTotalInCents ?? cart?.totalPriceInCents ?? 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-semibold">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs font-medium">
          <p className="text-sm">Transporte e Manuseio</p>
          <p className="text-muted-foreground text-sm font-semibold">Grátis</p>
        </div>
        <div className="flex items-center justify-between text-xs font-medium">
          <p className="text-sm">Total</p>
          <p className="text-sm font-bold">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>
        <Separator className="my-7" />
        {cartItems ? (
          // Renderiza props quando fornecidas (SSR)
          cartItems.map((item) => (
            <div key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.variantName}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-muted-foreground text-xs font-medium">
                      {item.variantName}
                    </p>
                    <p>{item.quantity}</p>
                    <p className="text-sm font-medium">
                      {formatCentsToBRL(item.priceInCents)}
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="my-5" />
            </div>
          ))
        ) : (
          // Renderiza do hook quando props não fornecidas (client-side)
          cart?.items.map((item) => (
            <div key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.productVariant.imageUrl}
                    alt={item.productVariant.name}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">
                      {item.productVariant.product.name}
                    </p>
                    <p className="text-muted-foreground text-xs font-medium">
                      {item.productVariant.name}
                    </p>
                    <p>{item.quantity}</p>
                    <p className="text-sm font-medium">
                      {formatCentsToBRL(item.productVariant.priceInCents)}
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="my-5" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
