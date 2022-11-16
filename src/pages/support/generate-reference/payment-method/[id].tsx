import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { GenerateReferencePaymentMethod } from "components/Support/GenarateReferencePaymentMethod";

const GenerateReferencePaymentMethodPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Detalhes de Evento</title>
      </Head>

      <Header />
      <Banner />
      <GenerateReferencePaymentMethod/>
    </>
  );
};

export default GenerateReferencePaymentMethodPage;
