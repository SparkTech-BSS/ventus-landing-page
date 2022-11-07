import Head from "next/head";
import { Header } from "components/Support/Header";
import { Banner } from "components/Support/Banner";
import { CheckUserExistence } from "components/Support/CheckUserExistence";

export default function CheckUserExistencePage() {
  return (
    <>
      <Head>
        <title>Ventus | Suporte | Verificar Existência de Usuário</title>
      </Head>

      <Header />
      <Banner />
      <CheckUserExistence/>
    </>
  );
}
