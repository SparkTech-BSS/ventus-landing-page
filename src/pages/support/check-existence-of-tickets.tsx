import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { CheckExistenceOfTickets } from "components/Support/CheckExistenceOfTickets";

export default function CheckExistenceOfTicketsPage() {
  return (
    <>
      <Head>
        <title>Ventus | Suporte | Verificar Existência de Usuário</title>
      </Head>

      <Header />
      <Banner />
      <CheckExistenceOfTickets/>
    </>
  );
}
