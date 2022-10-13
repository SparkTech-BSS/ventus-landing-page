import Head from "next/head";
import Layout from "components/Layout";
import { Tickets } from "components/Tickets";

export default function TicketsPage() {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      <Layout>
        <Tickets/>
      </Layout> 
    </>
  );
}