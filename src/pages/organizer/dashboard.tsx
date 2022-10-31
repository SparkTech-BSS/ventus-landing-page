import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { Header } from "components/Organizer/Header";
import { GetStaticProps } from "next";
import Head from "next/head";
import { DashboardContent } from "components/Organizer/DashboardContent";

export default function OrganizerDashboardPage() {
  return (
    <>
      <Head>
        <title>Ventus | Organizadores</title>
      </Head>
      <Header />
      <DashboardContent/>
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
