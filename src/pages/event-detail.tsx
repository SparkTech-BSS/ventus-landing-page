import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { EventDetail } from "../components/EventDetail";

const EventDetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Detalhes de Evento</title>
      </Head>

      <Layout>
        <EventDetail/>
      </Layout>
    </>
  );
};


export default EventDetailPage;