import type { NextPage } from "next";
import Head from "next/head";
import { CashBack } from "../components/CashBack";
import { Event } from "../components/Event";
import { Footer } from "../components/Footer";
import { WhatsappButton } from "../components/WhatsAppButton";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { StartParty } from "../components/StartParty";
import { State } from "../components/State";
import { GoUpButton } from "../components/GoUpButton";
import ScrollReveal from "../components/ScrollReveal";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      <Header />

      <main>
        <Hero />
        <ScrollReveal>
          <State
            text="Descubra festas em todas as cidades"
            state="1"
            heading="Inicie"
          />
        </ScrollReveal>

        <ScrollReveal>
          <Event />
        </ScrollReveal>

        <ScrollReveal>
          <StartParty />
        </ScrollReveal>

        <ScrollReveal>
          <State
            text="Termine curtindo com a galera"
            state="2"
            heading="Finalize"
          />
        </ScrollReveal>

        <ScrollReveal>
          <CashBack />
        </ScrollReveal>

        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </main>

      <WhatsappButton />
      <GoUpButton />
    </>
  );
};

export default Home;
