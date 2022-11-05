import Head from "next/head";
import { parseCookies } from "nookies";
import { Header } from "components/Organizer/Header";
import { CreateEvent } from "components/Organizer/CreateEvent";

export default function CreateEventPage() {
  return (
    <>
      <Head>
        <title>Ventus | Organizadores | Criar Evento</title>
      </Head>

      <Header />

      <CreateEvent/>
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
