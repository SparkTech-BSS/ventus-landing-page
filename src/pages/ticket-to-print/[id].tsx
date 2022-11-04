import { TicketToPrint } from "components/TicketToPrint";
import Head from "next/head";
import Layout from "../../components/Layout";

export default function TicketToPrintPage() {
  return (
    <>
      <Head>
        <title>Ventus | Imprimir Tickets</title>
      </Head>

      <Layout>
        <TicketToPrint/>
      </Layout>
    </>
  );
}