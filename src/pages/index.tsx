import type { NextPage } from "next";
import Head from "next/head";

import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      <Header />

      <main>
        <Hero/>
      </main>
    </>
  );
};

export default Home;
