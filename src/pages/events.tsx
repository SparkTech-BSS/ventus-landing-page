import { ResultSearch } from "../components/ResultSearch";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const EventsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus - Eventos</title>
      </Head>

      <Layout>
        <ResultSearch />
      </Layout>
    </>
  );
};

export default EventsPage;


// export const getStaticProps: GetStaticProps = withCSR(async (ctx: any) => {
//     let events: any;
//     let isError = false;
  
//     try {
//       const data = await EventService.findAll();
//       events = data;
//     } catch (error) {
//       isError = true;
//       console.log(error);
//     }
  
//     return {
//       props: {
//         events: events ? events : null,
//         isError,
//       },
//       revalidate: 10,
//     };
//   });