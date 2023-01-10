import { Profile } from "components/Profile";
import { ProfileLayout } from "components/Profile/Layout";
import { Sidebar } from "components/Profile/Sidebar";
import Head from "next/head";
import { AccountInfo } from "components/Profile/AccountInfo";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Ventus</title>
      </Head>
      <ProfileLayout>
        <Sidebar />
        <AccountInfo />
      </ProfileLayout>
    </>
  );
}
