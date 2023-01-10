import { parseCookies } from "nookies";
import Head from "next/head";
import { Header } from "components/Admin/Header";
import { DashboardContent } from "components/Admin/DashboardContent";

export default function AdminOrganizerPage() {
  return (
    <>
      <Head>
        <title>Ventus | Admin</title>
      </Head>
      <Header />
    </>
  );
}
