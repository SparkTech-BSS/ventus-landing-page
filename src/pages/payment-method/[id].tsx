import type { NextPage } from "next";
import Head from "next/head";

import { PaymentMethod } from "../../components/PaymentMethod";
import Layout from "../../components/Layout";

const PaymentMethodPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Payment Method</title>
      </Head>

      <Layout>
        <PaymentMethod/>
      </Layout>
    </>
  );
};


export default PaymentMethodPage;