import { router } from "@/server/trpc/trpc";
import { authRouter } from "./auth";
import { cartRouter } from "./cart";

export const appRouter = router({
  cart: cartRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
