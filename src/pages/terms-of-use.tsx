import { TermOfUse } from "components/TermOfUse";
import Head from "next/head";
import Layout from "../components/Layout";

export default function TermsOfUsePage() {
    return (
        <>
          <Head>
            <title>Ventus</title>
          </Head>
    
          <Layout>
            <TermOfUse/>
          </Layout>
        </>
      );
}