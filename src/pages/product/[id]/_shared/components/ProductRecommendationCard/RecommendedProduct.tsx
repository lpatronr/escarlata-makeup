import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import type { Product } from "@/generated/shopify/types";
import extractShopifyResourceId from "@/utils/extractShopifyResourceId";
import formatPriceAsCOP from "@/utils/formatPriceAsCOP";

type ProductImage = Product["images"]["nodes"][number];

type Props = {
  id: Product["id"];
  amount: number;
  image: ProductImage;
  title: Product["title"];
  tags: Product["tags"];
};

const RecommendedProduct: FC<Props> = ({ amount, image, id, title, tags }) => {
  const formattedPrice = formatPriceAsCOP(amount);

  return (
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Image
          src={image?.url}
          alt={image?.altText ?? "Imagen del producto"}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          width={500}
          height={500}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${extractShopifyResourceId(id)}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{tags.join(",")}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default RecommendedProduct;
