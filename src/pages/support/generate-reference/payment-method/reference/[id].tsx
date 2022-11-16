import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { Reference } from "components/Support/Reference";

export default function ReferencePaymentPage() {
  return (
    <>
      <Head>
        <title>Ventus | Suporte | Método de Pagamento</title>
      </Head>

      <Header />
      <Banner />
      <Reference/>
    </>
  );
}
