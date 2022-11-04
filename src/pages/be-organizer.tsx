import Head from "next/head";
import { BeOrganizer } from "../components/BeOrganizer";
import { Footer } from "components/Footer";

export default function BeOrganizerPage() {
  return (
    <>
      <Head>
        <title>Ventus | Seja um promotor</title>
      </Head>

      <BeOrganizer/>

      <Footer/>
    </>
  );
}
