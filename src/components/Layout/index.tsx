import { Header } from "../Header";
import { WhatsappButton } from "../WhatsAppButton";
import { AppMenuBottom } from "../AppMenuBottom";
import { GoUpButton } from "../GoUpButton";
import { Footer } from "../Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* <WhatsappButton /> */}
      <GoUpButton />
      <AppMenuBottom/>
    </>
  );
}
