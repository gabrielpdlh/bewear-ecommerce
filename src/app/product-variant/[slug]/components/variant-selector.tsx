import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferInsert)[];
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug ? "rounded-2xl border-2" : ""
          }
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            height={68}
            width={68}
            className="rounded-2xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
