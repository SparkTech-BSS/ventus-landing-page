import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { Header } from "components/Organizer/Header";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Organizer/Layout";
import { EventDetail } from "components/Organizer/EventDetail";

export default function OrganizerEventDetailPage() {
  return (
    <>
      <Head>
        <title>Ventus | Organizador - Dashboard</title>
      </Head>
      <Header />
      <Layout>
        <EventDetail />
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
    props: {},
    // revalidate: 60,
  };
};
