import dynamic from "next/dynamic";
import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { parseCookies } from "nookies";
import { GetStaticProps } from "next";
import { SupportHome } from "components/Support/SupportHome";

export default function Support() {
  return (
    <>
      <Head>
        <title>Ventus | Suporte</title>
      </Head>
      <Header />
      <Banner />
      <SupportHome/>
    </>
  );
}
