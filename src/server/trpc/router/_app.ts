import { favoritesRouter } from "@/server/trpc/router/favorites";
import { router } from "@/server/trpc/trpc";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  favorites: favoritesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
