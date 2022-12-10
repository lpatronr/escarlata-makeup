import { ApolloProvider } from "@apollo/client";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import apolloClient from "@/lib/apollo-client";
import { userCartItemsState, userFavoritesState } from "@/store";
import { trpc } from "@/utils/trpc";
import "@/styles/globals.css";
import type { FC, ReactNode } from "react";

const StateWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  const [_userFavorites, setUserFavorites] = useRecoilState(userFavoritesState);
  const [_userCartItems, setUserCartItems] = useRecoilState(userCartItemsState);

  trpc.cart.getCartAndFavorites.useQuery(undefined, {
    enabled: session.data?.user?.id !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess(data) {
      const favorites = data?.favorites ?? [];
      setUserFavorites(
        favorites.map((favorite) => ({
          productId: favorite.productId,
          favoriteId: favorite.id,
        }))
      );

      const cartItems = data?.cartItems ?? [];
      setUserCartItems(cartItems.map(({ merchandiseId }) => merchandiseId));
    },
  });

  return <>{children}</>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <StateWrapper>
          <Component {...pageProps} />
        </StateWrapper>
      </RecoilRoot>
    </ApolloProvider>
  </SessionProvider>
);

export default trpc.withTRPC(MyApp);
