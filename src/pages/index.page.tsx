import Head from "next/head";
import { Navbar } from "@/layouts";
import { Hero, Featured, AllProducts } from "./_components";
import type { NextPage } from "next";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Escarlata Makeup</title>
      <meta name="description" content="Escarlata Makeup" />
    </Head>

    <Navbar />
    <Hero />
    <Featured />
    <AllProducts />
  </>
);

export default Home;
