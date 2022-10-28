import { PrivacyPolicies } from "components/PrivacyPolicies";
import Head from "next/head";
import Layout from "../components/Layout";

export default function PrivacyPoliciesPage() {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>

      <Layout>
        <PrivacyPolicies/>
      </Layout>
    </>
  );
}
