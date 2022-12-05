import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import type { ProductsForFavoritesQuery } from "@/generated/shopify/types";
import { userFavoritesState } from "@/store";
import extractShopifyResourceId from "@/utils/extractShopifyResourceId";
import { trpc } from "@/utils/trpc";
import type { FC } from "react";

type Props = {
  product: ProductsForFavoritesQuery["products"]["nodes"][number];
};

const Favorite: FC<Props> = ({ product }) => {
  const [userFavorites, setUserFavorites] = useRecoilState(userFavoritesState);
  const { mutate, isLoading } = trpc.favorites.removeFavorite.useMutation();
  const productId = extractShopifyResourceId(product.id);

  function handleRemoveFavorite(): void {
    if (isLoading) return;

    const favoriteId = userFavorites.find(
      (favorite) => favorite.productId === product.id
    )?.favoriteId;
    if (favoriteId === undefined) return;

    mutate(
      { favoriteId },
      {
        onSuccess() {
          setUserFavorites((favorites) =>
            favorites.filter((favorite) => favorite.favoriteId !== favoriteId)
          );
        },
      }
    );
  }

  return (
    <li key={product.id} className="flex py-6">
      <Link
        href={`product/${productId}`}
        className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
      >
        <Image
          src={product.images.edges[0]?.node.src}
          alt={product.images.edges[0]?.node.altText ?? ""}
          className="h-full w-full object-cover object-center"
          width={300}
          height={300}
        />
      </Link>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`product/${productId}`}>{product.title}</Link>
            </h3>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex">
            <button
              type="button"
              className="font-medium text-red-600 hover:text-red-500 disabled:opacity-50"
              disabled={isLoading}
              onClick={() => {
                handleRemoveFavorite();
              }}
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Favorite;
