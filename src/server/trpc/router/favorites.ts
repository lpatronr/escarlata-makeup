import { z } from "zod";
import { protectedProcedure, router } from "@/server/trpc/trpc";

export const favoritesRouter = router({
  getFavorites: protectedProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.user
        .findUnique({
          where: { id: ctx.session.user.id },
        })
        .favorites()
  ),
  addFavorite: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.favorite.create({
          data: {
            userId: ctx.session.user.id,
            productId: input.productId,
          },
        })
    ),
  removeFavorite: protectedProcedure
    .input(
      z.object({
        favoriteId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const removedFavorite = await ctx.prisma.favorite.delete({
        where: {
          id: input.favoriteId,
        },
      });

      return removedFavorite;
    }),
});
