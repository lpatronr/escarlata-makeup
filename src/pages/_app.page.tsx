import { ApolloProvider } from "@apollo/client";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { type FC, type ReactNode } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import apolloClient from "@/lib/apollo-client";
import { userFavoritesState } from "@/store";
import { trpc } from "@/utils/trpc";
import "@/styles/globals.css";

const StateWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  const [_userFavorites, setUserFavorites] = useRecoilState(userFavoritesState);

  trpc.favorites.getFavorites.useQuery(undefined, {
    enabled: session.data?.user?.id !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      setUserFavorites(
        data?.map((favorite) => ({
          productId: favorite.productId,
          favoriteId: favorite.id,
        })) ?? []
      );
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
