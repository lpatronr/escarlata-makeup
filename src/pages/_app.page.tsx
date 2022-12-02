import { ApolloProvider } from "@apollo/client";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { RecoilRoot } from "recoil";
import apolloClient from "@/lib/apollo-client";
import { trpc } from "@/utils/trpc";
import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  </SessionProvider>
);

export default trpc.withTRPC(MyApp);
