import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "services/api";
import { IoIosArrowForward } from "react-icons/io";
import { EventCard } from "components/EventCard";
import { Loading } from "components/Loading";
import styles from "./styles.module.scss";

export function GenerateReferenceEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any>([]);

  const isNotEmpty = events.length ? true : false;

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);

    async function fetchEvents() {
      setLoading(true);

      try {
        const { data } = await api.get(`events/findall`);
        setEvents(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section className={`${styles["generate-reference"]}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles["breadcrumbs"]}>
          <Link href="/support" passHref>
            <a className={`${styles["breadcrumbs-link"]}`}>Home</a>
          </Link>

          <IoIosArrowForward size={16} color="#AAAAAA" />

          <Link href="/support/generate-reference" passHref>
            <a
              className={`${styles["breadcrumbs-link"]} ${styles["breadcrumbs-active-link"]}`}
            >
              Gerar Referência
            </a>
          </Link>
        </div>
      </div>

      <div className="container">
        <div className={styles["row"]}>
          <h2 className={styles["page-heading"]}>Todos os eventos</h2>
          <span className={styles["page-subheading"]}>
            Acessa um evento e gere a referência, o processo de gerar refência é
            idêntico ao processo da compra normal de um ingresso.
          </span>
          <Link href="/support/generate-reference/list-of-user-reference">
            <a className={`${styles["reference-link"]}`}>
              Lista de Usuários
            </a>
          </Link>
        </div>
      </div>

      <section className={styles["result-search"]}>
        <div className="container">
          <div className={styles["result-search-row"]}>
            <h3 className={styles["result-search-heading"]}>
              {events?.length} EVENTOS ENCONTRADOS
            </h3>

            <div className={styles["filter-control"]}>
              <span className={styles["filter-control__text"]}>
                Ordenar por:
              </span>
              <select
                className={styles["filter-control__select"]}
                // onChange={handleSelectSort}
              >
                {/* <option value="Relevância">Relevância</option> */}
                <option value="Crescente">Crescente</option>
                <option value="Descrescente">Descrescente</option>
              </select>
            </div>
          </div>

          <div className={styles.content}>
            {loading ? (
              <Loading />
            ) : isNotEmpty ? (
              <>
                {events.map((item: any) => {
                  return (
                    <EventCard
                      key={item?.event?._id}
                      data={item?.event}
                      link={`/support/generate-reference/event-detail/${item?.event?._id}`}
                    />
                  );
                })}
              </>
            ) : (
              <div className={styles["empty-container"]}>
                <h3 className={styles["empty-container__heading"]}>
                  Sem resultados
                </h3>
                <p className={styles["empty-container__text"]}>
                  Não encontramos eventos que corresponda à sua busca. Tente
                  buscar outras palavras-chave
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
