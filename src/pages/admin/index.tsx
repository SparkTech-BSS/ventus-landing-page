import { parseCookies } from "nookies";
import Head from "next/head";
import { Header } from "components/Admin/Header";
import { DashboardContent } from "components/Admin/DashboardContent";

export default function AdminDashboardPage() {
  return (
    <>
      <Head>
        <title>Ventus | Admin</title>
      </Head>
      <Header />
      <DashboardContent />
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
  };
};
