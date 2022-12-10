import { atom } from "recoil";
import type { LineItem } from "@prisma/client";

type State = Array<LineItem["merchandiseId"]>;

const userCartItemsState = atom<State>({
  key: "userCartItems",
  default: [],
});

export default userCartItemsState;
