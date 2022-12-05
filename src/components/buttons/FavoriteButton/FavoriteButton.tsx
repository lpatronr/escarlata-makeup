import { HeartIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import type { Product } from "@/generated/shopify/types";
import { userFavoritesState } from "@/store";
import cs from "@/utils/cs";
import { trpc } from "@/utils/trpc";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  productId: Product["id"];
} & ComponentPropsWithoutRef<"button">;

const FavoriteButton: FC<Props> = ({ className, productId, ...props }) => {
  const session = useSession();

  const [userFavorites, setUserFavorites] = useRecoilState(userFavoritesState);
  const add = trpc.favorites.addFavorite.useMutation();
  const remove = trpc.favorites.removeFavorite.useMutation();
  const isFavorite = userFavorites.some((favorite) => favorite.productId === productId);

  function toggleFavorite(): void {
    if (add.isLoading || remove.isLoading) return;

    if (session.data?.user?.id === undefined) {
      void signIn("google");
      return;
    }

    if (isFavorite) {
      const favoriteId = userFavorites.find(
        (favorite) => favorite.productId === productId
      )?.favoriteId;

      if (favoriteId === undefined) return;

      remove.mutate(
        {
          favoriteId,
        },
        {
          onSuccess: () => {
            setUserFavorites(userFavorites.filter((favorite) => favorite.productId !== productId));
          },
        }
      );

      return;
    }

    add.mutate(
      {
        productId: productId,
      },
      {
        onSuccess: (data) => {
          setUserFavorites([
            ...userFavorites,
            {
              productId: productId,
              favoriteId: data.id,
            },
          ]);
        },
      }
    );
  }

  return (
    <button
      type="button"
      className={cs("active:scale-95 active:transform disabled:opacity-50", className)}
      disabled={add.isLoading || remove.isLoading}
      onClick={() => {
        toggleFavorite();
      }}
      {...props}
    >
      <HeartIcon
        className={cs(
          "h-5 w-5 transition duration-200 ease-in-out",
          isFavorite ? "fill-red-500 hover:fill-red-600" : "hover:fill-gray-300"
        )}
        aria-label="Botón para agregar a favoritos"
      />
    </button>
  );
};

export default FavoriteButton;
