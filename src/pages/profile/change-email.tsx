import { Profile } from "components/Profile";
import { ProfileLayout } from "components/Profile/Layout";
import { Sidebar } from "components/Profile/Sidebar";
import Head from "next/head";
import { ChangeEmail } from "components/Profile/ChangeEmail";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>
      <ProfileLayout>
        <Sidebar />
        <ChangeEmail />
      </ProfileLayout>
    </>
  );
}
