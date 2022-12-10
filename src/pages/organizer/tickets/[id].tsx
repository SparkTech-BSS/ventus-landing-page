import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { Header } from "components/Organizer/Header";
import Head from "next/head";
import { Layout } from "../../../components/Organizer/Layout";

export default function OrganizerTicketPage() {
  return (
    <>
      <Head>
        <title>Ventus | Organizador - Igressos</title>
      </Head>
      <Header />
      <Layout>

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