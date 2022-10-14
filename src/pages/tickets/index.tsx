import Head from "next/head";
import Layout from "components/Layout";
import { parseCookies } from "nookies";
import { Tickets } from "components/Tickets";

export default function TicketsPage() {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      <Layout>
        <Tickets />
      </Layout>
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  // const apiClient = getAPIClient(ctx);
  const { ["ventus.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }


  return {
    props: {
    },
    // revalidate: 60,
  };
};
