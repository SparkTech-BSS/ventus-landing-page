import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { GenerateReferenceEventDetail } from "components/Support/GenarateReferenceEventDetail";


const GenerateReferenceEventsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Detalhes de Evento</title>
      </Head>

      <Header />
      <Banner />
      <GenerateReferenceEventDetail/>
    </>
  );
};

export default GenerateReferenceEventsPage;