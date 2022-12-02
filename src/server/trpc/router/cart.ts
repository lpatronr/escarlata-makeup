import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc/trpc";

export const cartRouter = router({
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const cart = await ctx.prisma.cart.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return cart?.products ?? [];
  }),
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId } = input;

      const result = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          Cart: {
            update: {
              products: {
                push: productId,
              },
            },
          },
        },
      });

      return result;
    }),
});
