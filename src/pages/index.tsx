import { GetStaticProps } from "next";
import Head from "next/head";
import EventService from "../services/EventService";
import { Error404 } from "../components/Error404";
import { withCSR } from "HOC/with-CSR";
import { CashBack } from "../components/CashBack";
import { Event } from "../components/Event";
import { Hero } from "components/v2/Hero";
import { Categories } from "components/v2/Categories";
import { StartParty } from "../components/StartParty";
import { State } from "../components/State";
import { CookiesConsent } from "../components/CookiesConsent";
import Layout from "../components/Layout";
import { HighlightedEvent } from "components/v2/HighlightedEvent";
import { ForOrganizer } from "components/v2/ForOrganizer";

export default function Home({ events, isError }: any) {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      {isError ? (
        <Error404 />
      ) : (
        <>
          <CookiesConsent />
          <Layout>
            <Hero />
            <Categories/>
            <HighlightedEvent/>
            <Event data={events} />
            <ForOrganizer/>
            <State
              text="Descubra Eventos em Angola."
              state="1"
              heading="Primeiro"
            />
            <StartParty />
            <State
              text="Finalize estando com quem mais gostas."
              state="2"
              heading="Finalize"
            />
            <CashBack />
          </Layout>
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = withCSR(async (ctx: any) => {
  let events: any;
  let isError = false;

  try {
    const data = await EventService.findAll();
    events = data;
  } catch (error) {
    isError = true;
    console.log(error);
  }

  return {
    props: {
      events: events ? events : null,
      isError,
    },
    revalidate: 10,
  };
});
