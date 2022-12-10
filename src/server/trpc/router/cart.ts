import { ApolloClient, InMemoryCache } from "@apollo/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CreateCartDocument } from "@/generated/shopify/types";
import { protectedProcedure, router } from "@/server/trpc/trpc";

export const cartRouter = router({
  createCart: protectedProcedure
    .input(
      z.object({
        merchandiseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.prisma.user
        .findUnique({
          where: { id: ctx.session.user.id },
        })
        .cart();

      if (cart !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart already exists",
        });
      }

      const apollo = new ApolloClient({
        uri: process.env.SHOPIFY_GRAPHQL_URL,
        headers: {
          "X-Shopify-Storefront-Access-Token": process.env
            .SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
        },
        cache: new InMemoryCache(),
      });

      const { data } = await apollo.mutate({
        mutation: CreateCartDocument,
        variables: {
          merchandiseId: input.merchandiseId,
        },
      });

      const id = data?.cartCreate?.cart?.id;
      const lineItem = data?.cartCreate?.cart?.lines.nodes[0];

      if (id === undefined || lineItem === undefined) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create cart",
        });
      }

      const newCart = await ctx.prisma.cart.create({
        data: {
          userId: ctx.session.user.id,
          shopifyId: id,
          lineItems: {
            create: [
              {
                quantity: 1,
                merchandiseId: lineItem.id,
              },
            ],
          },
        },
      });

      return newCart;
    }),
  getCartAndFavorites: protectedProcedure.query(async ({ ctx }) => {
    const cartItems = await ctx.prisma.user
      .findUnique({
        where: { id: ctx.session.user.id },
      })
      .cart()
      .lineItems();

    const favorites = await ctx.prisma.user
      .findUnique({
        where: { id: ctx.session.user.id },
      })
      .favorites();

    return { cartItems, favorites };
  }),
});
