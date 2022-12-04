import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { type FC } from "react";
import { CartIcon } from "@/components/icons";
import type { ProductsQuery } from "@/generated/shopify/types";
import formatToCOP from "@/utils/formatToCOP";

type Props = {
  product: ProductsQuery["products"]["nodes"][number];
};

const Product: FC<Props> = ({ product }) => {
  const price = product.priceRange.minVariantPrice.amount;
  const priceFormatted = formatToCOP(price);

  return (
    <div className="flex flex-col justify-between rounded-md p-3 shadow-md">
      <div>
        <Image
          src={product.images.edges[0]?.node.url}
          alt={product.title}
          className="h-62 w-full rounded-md object-cover xs:h-96 sm:h-64 md:h-72 lg:h-80 xl:h-96"
          width={300}
          height={300}
        />

        <div className="mt-2 flex h-24 flex-col gap-1">
          <span className="text-lg font-medium capitalize">{product.title}</span>
          <span className="self-start rounded-md bg-gray-200 px-1 py-0.5 text-xs font-medium">
            {product.productType}
          </span>
          <p className="overflow-y-hidden text-sm text-gray-500">{product.tags.join(", ")}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-medium">{priceFormatted}</p>

        <div className=" flex items-center gap-1">
          <button
            type="button"
            className="mr-1 flex items-center gap-1 rounded-md bg-red-200 p-2 text-sm shadow-sm duration-200 ease-in-out hover:bg-gray-300 active:scale-95 active:transform"
          >
            <CartIcon className="h-5 w-5" />
          </button>

          <button type="button" className="group active:scale-95 active:transform">
            <StarIcon className="h-5 w-5 group-hover:fill-yellow-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
