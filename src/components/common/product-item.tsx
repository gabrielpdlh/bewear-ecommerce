"use server";

import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductListProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductListProps) => {
  const firtsVariant = product.variants[0];
  return (
    <Link href="/">
      <Image
        src={firtsVariant.imageUrl}
        alt={firtsVariant.name}
        height={150}
        width={150}
        className="rounded-3xl"
      />
      <div className="flex flex-col gap-1 max-w-[150px]">
        <p className="truncante text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">{product.description}</p>
        <p>{formatCentsToBRL(firtsVariant.priceInCents)}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
