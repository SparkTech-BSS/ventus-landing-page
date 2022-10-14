import type { NextPage } from "next";
import Head from "next/head";
import { SelectTicket } from "components/SelectTicket";
import Layout from "components/Layout";

const SelectTicketPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Select Tickets</title>
      </Head>

      <Layout>
        <SelectTicket />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.params;

  console.log(id);

  return {
    props: {}, 
  };
}

export default SelectTicketPage;
