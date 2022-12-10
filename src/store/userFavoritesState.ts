import { atom } from "recoil";
import type { Favorite } from "@prisma/client";

type State = {
  productId: Favorite["productId"];
  favoriteId: Favorite["id"];
};

const userFavoritesState = atom<State[]>({
  key: "userFavorites",
  default: [],
});

export default userFavoritesState;
