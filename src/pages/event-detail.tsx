import type { NextPage } from "next";
import Layout from "../components/Layout";
import Head from "next/head";
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