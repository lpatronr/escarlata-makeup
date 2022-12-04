import Head from "next/head";
import { useRef } from "react";
import { type HeroQuery, HeroDocument } from "@/generated/cms/types";
import { Footer, Header } from "@/layouts";
import apolloClient from "@/lib/apollo-client";
import { Hero, Featured, AllProducts } from "./_shared/components";
import type { GetStaticProps } from "next";
import type { NextPage } from "next";

type Props = {
  heroData: HeroQuery["heroes"][0] | undefined;
};

const Home: NextPage<Props> = ({ heroData }) => {
  const featuredRef = useRef<HTMLDivElement>(null);

  function handleScrollToFeatured(): void {
    if (featuredRef.current === null) return;

    window.scroll({
      top: featuredRef.current?.offsetTop - 80,
      behavior: "smooth",
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
    query: HeroDocument,
    context: {
      clientName: "hygraph",
    },
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
