import type { NextPage } from "next";
import { Reference } from "../../../components/Reference";
import Head from "next/head";

const ReferencePaymentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ventus | Payment Smart</title>
      </Head>

      <main>
        <Reference />
      </main>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.params;

  console.log(id);

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ReferencePaymentPage;
