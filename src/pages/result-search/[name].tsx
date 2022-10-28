import { ResultSearch } from "../../components/ResultSearch";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import EventService from "services/EventService";
import { Error404 } from "components/Error404";
import { useRouter } from "next/router";
import { withCSR } from "HOC/with-CSR";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";

interface Props {
  isError: boolean;
}

const ResultSearchPage = ({ isError }: Props) => {
  const router = useRouter();

  const { name } = router.query;

  return (
    <>
      <Head>
        <title>Ventus | Pesquisa</title>
      </Head>

      {isError ? (
        <Error404 />
      ) : (
        <Layout>
          <ResultSearch search={name?.toString()}/>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx: any) => {

  const { name } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(["eventsByName", name], () =>
      EventService.findByName(name)
    );
  } catch (error: any) {
    isError = true;
    ctx.res.statusCode = error?.response.status;
  }

  return {
    props: {
      //also passing down isError state to show a custom error component.
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default ResultSearchPage;
