import type { NextPage } from "next";
import { PaySmart } from "../../../components/PaySmart";
import Head from "next/head";

const PaytSmartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Payment Smart</title>
      </Head>

      <main>
        <PaySmart/>
      </main>
    </>
  );
};

export default PaytSmartPage;
