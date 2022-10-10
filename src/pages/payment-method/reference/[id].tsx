import type { NextPage } from "next";
import { Reference } from "../../../components/Reference";
import Head from "next/head";

const ReferencePaymentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Payment Smart</title>
      </Head>

      <main>
        <Reference/>
      </main>
    </>
  );
};

export default ReferencePaymentPage;