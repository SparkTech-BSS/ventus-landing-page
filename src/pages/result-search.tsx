import { ResultSearch } from "../components/ResultSearch";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const ResultSearchPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Pesquisa</title>
      </Head>

      <Layout>
        <ResultSearch />
      </Layout>
    </>
  );
};

export default ResultSearchPage;
