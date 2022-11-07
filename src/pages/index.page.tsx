import Head from "next/head";
import { Footer, Header } from "@/layouts";
import { Hero, Featured, AllProducts } from "./_components";
import type { NextPage } from "next";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Escarlata Makeup</title>
      <meta name="description" content="Escarlata Makeup" />
    </Head>

    <Header />
    <Hero />
    <Featured />
    <AllProducts />
    <Footer />
  </>
);

export default Home;
