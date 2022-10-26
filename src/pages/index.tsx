import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import EventService from "../services/EventService";
import { api } from "services/api";
import { Error404 } from "../components/Error404";
import { withCSR } from "HOC/with-CSR";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CashBack } from "../components/CashBack";
import { Event } from "../components/Event";
import { WhatsappButton } from "../components/WhatsAppButton";
import { Hero } from "../components/Hero";
import { StartParty } from "../components/StartParty";
import { State } from "../components/State";
import { GoUpButton } from "../components/GoUpButton";
import { CookiesConsent } from "../components/CookiesConsent";
import { Rainbow } from "components/Rainbow";
import Layout from "../components/Layout";

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
            <Event data={events} />
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
