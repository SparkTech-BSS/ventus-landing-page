import type { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout";
import { api } from "services/api";
import { EventDetail } from "components/EventDetail";

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
  

  export async function getServerSideProps(ctx: any) {

    const { id } = ctx.params;

    console.log(id)

    return {
      props: {
        
      }, // will be passed to the page component as props
    }
  }
  
  export default EventDetailPage;