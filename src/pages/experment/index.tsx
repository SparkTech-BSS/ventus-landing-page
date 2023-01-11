import { Button } from "components/Experment/Experment1/Button";
import { CardValor } from "components/Experment/Experment1/CardValor";
import { Search } from "components/Experment/Experment1/Search";
import Layout from "components/Layout";
import styles from "./styles.module.scss";
export default function Experment() {
  return (
    <>
      <Layout>
        <section className={styles.container}>
        
          <Search textTitle="Organizadores de eventos"/>
        </section>
        
      </Layout>
    </>
  );
}
