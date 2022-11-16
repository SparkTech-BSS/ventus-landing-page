import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { GenerateReferenceSelectTicket } from "components/Support/GenerateReferenceSelectTicket";

const GenerateReferenceSelectTicketPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Detalhes de Evento</title>
      </Head>

      <Header />
      <Banner />
      <GenerateReferenceSelectTicket />
    </>
  );
};

export default GenerateReferenceSelectTicketPage;
