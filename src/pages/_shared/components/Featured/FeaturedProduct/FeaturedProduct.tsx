import { SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { Button } from "@/components/buttons";
import type { FeaturedProductsQuery } from "@/generated/shopify/types";
import formatToCOP from "@/utils/formatToCOP";
import cleanShopifyId from "@/utils/getShopifyId";

type Props = {
  product: FeaturedProductsQuery["products"]["nodes"][number];
};

const FeaturedProduct: FC<Props> = ({ product }) => {
  const price = product.priceRange.minVariantPrice.amount;
  const priceFormatted = formatToCOP(price);
  const id = cleanShopifyId(product.id);

  return (
    <SplideSlide key={product.id} className="flex flex-col p-2 tracking-tighter">
      <Link href={`/products/${id}`}>
        <Image
          src={product.images.edges[0]?.node.url}
          alt={product.title}
          className="h-60 w-full rounded-md object-cover shadow-md xl:h-80"
          width={300}
          height={300}
        />
      </Link>
      <Link href={`/product/${id}`} className="mt-2 text-lg font-medium capitalize">
        {product.title}
      </Link>
      {/* paragraph that contains the first tag, but the height of it must equal 2 lines of split text, to ensure that the height of all of the splides are proportionally equal */}
      <p className="h-10 overflow-hidden text-sm text-gray-500">{product.tags[0]}</p>

      <Button className="mt-2 block self-center px-8 py-2 text-sm">
        AÑADIR AL BOLSO {priceFormatted}
      </Button>
    </SplideSlide>
  );
};

export default FeaturedProduct;
