import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { api } from "services/api";
import { EventCard } from "components/EventCard";
import { useEventsByName } from "hooks/api/events";
import styles from "./styles.module.scss";
import { Loading } from "components/Loading";

interface Props {
  search?: string;
}

export function ResultSearch({ search = "" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<any>([]);
  // const [filteredData, setFilteredData] = useState([]);
  // const [search, setSearch] = useState('');
  const { name } = router.query;

  const filteredData =
    search.length > 0
      ? eventData.filter((item: any) => item?.event?.name?.toLowerCase().includes(search))
      : eventData;

  const isNotEmpty = filteredData.length ? true : false;

  // const { data, isLoading, isError } = useEventsByName(name);

  useEffect(() => {
    setLoading(true);
    async function fetchEvents() {
      try {
        const { data } = await api.get(`events/findall`);
        setEventData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [name]);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <div className={styles["bread-crumb"]}>
            <a className={styles["bread-crumb-link"]}>Home</a>
            <IoIosArrowForward
              size={20}
              color="#939598"
              className={styles["bread-crumb-separator"]}
            />
            <a className={styles["bread-crumb-link"]}>Encontre Eventos</a>
          </div>
        </div>

        <div className="container">
          <div className={styles["header-row"]}>
            <h2 className={styles["page-heading"]}>Todos os eventos</h2>

            <div className={styles["filter-control"]}>
              <span className={styles["filter-control__text"]}>
                Filtrar por:
              </span>
              <select className={styles["filter-control__select"]}>
                <option>Categorias</option>
                <option>Música</option>
                <option>Business</option>
                <option>Comida {"&"} Bebida</option>
                <option>Arte</option>
                <option>Festa</option>
                <option>Teatro</option>
                <option>Palestra</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <section className={styles["result-search"]}>
        <div className="container">
          <div className={styles["result-search-row"]}>
            <h3 className={styles["result-search-heading"]}>
              {filteredData?.length} EVENTOS ENCONTRADOS
            </h3>

            <div className={styles["filter-control"]}>
              <span className={styles["filter-control__text"]}>
                Ordenar por:
              </span>
              <select className={styles["filter-control__select"]}>
                <option>Relevância</option>
                <option>Crescente</option>
                <option>Descrescente</option>
              </select>
            </div>
          </div>

          <div className={styles.content}>
            {loading ? (
              <Loading />
            ) : isNotEmpty ? (
              <>
                {filteredData.map((item: any) => {
                  return (
                    <EventCard key={item?.event?._id} data={item?.event} />
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
    </>
  );
}
