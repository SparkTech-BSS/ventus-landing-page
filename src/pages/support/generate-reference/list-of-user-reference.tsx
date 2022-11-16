import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { ListOfUserReference } from "components/Support/ListOfUserReference";

export default function ListOfUserReferencePage() {
  return (
    <>
      <Head>
        <title>Ventus | Suporte</title>
      </Head>
      <Header />
      <Banner />
      <ListOfUserReference/>
    </>
  );
}
