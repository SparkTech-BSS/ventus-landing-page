import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { GenerateReferenceEvents } from "components/Support/GenerateReferenceEvents";

export default function GenerateReference() {
  return (
    <>
      <Head>
        <title>Ventus | Suporte | Gerar Referência</title>
      </Head>
      <Header />
      <Banner />
      <GenerateReferenceEvents/>
    </>
  );
}
