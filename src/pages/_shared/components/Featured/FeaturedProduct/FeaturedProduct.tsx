import { SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { Button } from "@/components/buttons";
import type { FeaturedProductsQuery } from "@/generated/shopify/types";
import extractShopifyResourceId from "@/utils/extractShopifyResourceId";
import formatPriceAsCOP from "@/utils/formatPriceAsCOP";

type Props = {
  product: FeaturedProductsQuery["products"]["nodes"][number];
};

const FeaturedProduct: FC<Props> = ({ product }) => {
  const productPrice = product.priceRange.minVariantPrice.amount;
  const formattedPrice = formatPriceAsCOP(productPrice);
  const productId = extractShopifyResourceId(product.id);

  return (
    <SplideSlide key={product.id} className="flex flex-col p-2 tracking-tighter">
      <Link href={`/product/${productId}`}>
        <Image
          src={product.images.edges[0]?.node.url}
          alt={product.title}
          className="h-60 w-full rounded-md object-cover shadow-md transition-opacity duration-200 ease-in-out hover:opacity-80 xl:h-80"
          width={300}
          height={300}
        />
      </Link>
      <Link href={`/product/${productId}`} className="mt-2 text-lg font-medium capitalize">
        {product.title}
      </Link>
      <p className="h-10 overflow-hidden text-sm text-gray-500">{product.tags.join(",")}</p>

      <Button className="mt-2 block self-center px-8 py-2 text-sm">
        AÑADIR AL BOLSO {formattedPrice}
      </Button>
    </SplideSlide>
  );
};

export default FeaturedProduct;
