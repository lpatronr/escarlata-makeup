import Head from "next/head";
import { useRef } from "react";
import type { HeroesQuery } from "@/generated/types";
import { HeroesDocument } from "@/generated/types";
import { Footer, Header } from "@/layouts";
import apolloClient from "@/lib/apollo-client";
import { Hero, Featured, AllProducts } from "./_shared/components";
import type { GetStaticProps } from "next";
import type { NextPage } from "next";

type Props = {
  heroData: HeroesQuery["heroes"][0] | undefined;
};

const Home: NextPage<Props> = ({ heroData }) => {
  const featuredRef = useRef<HTMLDivElement>(null);

  function handleScrollToFeatured(): void {
    featuredRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <Head>
        <title>Escarlata Makeup</title>
        <meta name="description" content="Escarlata Makeup" />
      </Head>

      <Header />
      <Hero heroData={heroData} handleScrollToFeatured={handleScrollToFeatured} />
      <Featured featuredRef={featuredRef} />
      <AllProducts />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await apolloClient.query({
    query: HeroesDocument,
  });

  const firstHero = data.heroes[0];

  return {
    props: {
      heroData: firstHero,
    },
    revalidate: 60,
  };
};

export default Home;
