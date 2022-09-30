import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { CashBack } from "../components/CashBack";
import { Event } from "../components/Event";
import { Footer } from "../components/Footer";
import { WhatsappButton } from "../components/WhatsAppButton";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { StartParty } from "../components/StartParty";
import { State } from "../components/State";
import { GoUpButton } from "../components/GoUpButton";
import { Cookies } from "../components/Cookies";
import { Rainbow } from "components/Rainbow/inde";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      {/* <Rainbow/> */}

      <Cookies />

      <Header />


      <main>
        <Hero />
        <Event />
        <State
          text="Descubra festas em todas as cidades"
          state="1"
          heading="Inicie"
        />
        <StartParty />
        <State
          text="Termine curtindo com a galera"
          state="2"
          heading="Finalize"
        />
        <CashBack />
        <Footer />
      </main>

      <WhatsappButton />
      <GoUpButton />
    </>
  );
};

export default Home;
