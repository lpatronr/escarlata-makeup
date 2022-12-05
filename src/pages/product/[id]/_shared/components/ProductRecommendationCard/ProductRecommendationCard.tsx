import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import formatPriceAsCOP from "@/utils/formatPriceAsCOP";

type Props = {
  product: {
    title: string;
    tags: string[];
    price: number;
    image: {
      url: string;
      altText: string | null | undefined;
    };
  };
};

const ProductRecommendationCard: FC<Props> = ({ product }) => {
  const formattedPrice = formatPriceAsCOP(product.price);

  return (
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Image
          src={product.image?.url}
          alt={product.image?.altText ?? "Imagen del producto"}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          width={500}
          height={500}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.tags.join(",")}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductRecommendationCard;
