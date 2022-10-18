import Head from "next/head";
import { withCSR } from "HOC/with-CSR";
import OrderService from "../../../services/OrderService";
import EventService from "../../../services/EventService";
import { Reference } from "../../../components/Reference";
import { getAPIClient } from "services/axios";
import { api } from "services/api";


function ReferencePaymentPage() {
  return (
    <>
      <Head>
        <title>Ventus | Payment Smart</title>
      </Head>

      <main>
        <Reference />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ReferencePaymentPage;
