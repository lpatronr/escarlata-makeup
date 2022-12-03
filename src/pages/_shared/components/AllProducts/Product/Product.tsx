import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";
import type { mockProducts } from "@/pages/_shared/components/AllProducts/mock";

type Props = {
  product: typeof mockProducts[number];
};

const Product: FC<Props> = ({ product }) => (
  <div className="flex flex-col justify-between rounded-md p-3 shadow-md">
    <div>
      <img
        src={product.image}
        alt={product.title}
        className="h-64 w-full rounded-md object-cover xs:h-96 sm:h-64 md:h-72 lg:h-80 xl:h-96"
        width={100}
        height={100}
      />

      <div className="mt-2 flex flex-col gap-1">
        <span className="self-start rounded-md bg-gray-200 px-1 py-0.5 text-xs font-medium">
          {product.category}
        </span>
        <span className="text-lg font-medium capitalize">{product.title}</span>
        <p className="text-sm text-gray-500">
          {product.description.length > 50
            ? `${product.description.substring(0, 50)}...`
            : product.description}
        </p>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <p className="text-lg font-medium">${product.price}</p>

      <div className=" flex items-center gap-1">
        <button
          type="button"
          className="mr-1 flex items-center gap-1 rounded-md bg-red-200 p-2 text-sm shadow-sm duration-200 ease-in-out hover:bg-gray-300 active:scale-95 active:transform"
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>

        <button type="button" className="group active:scale-95 active:transform">
          <StarIcon className="h-5 w-5 group-hover:fill-yellow-400" />
        </button>
      </div>
    </div>
  </div>
);

export default Product;
