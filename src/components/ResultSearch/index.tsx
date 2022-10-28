import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { api } from "services/api";
import { EventCard } from "components/EventCard";
// import { useEventsByName } from "hooks/api/events";
import styles from "./styles.module.scss";
import { Loading } from "components/Loading";

interface Props {
  search?: string;
}

export function ResultSearch({ search = "" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  // const [search, setSearch] = useState('');
  const { name } = router.query;

  // let filteredData =
  //   search.length > 0
  //     ? eventData.filter((item: any) =>
  //         item?.event?.name?.toLowerCase().includes(search)
  //       )
  //     : eventData;

  const isNotEmpty = filteredData.length ? true : false;

  function handleSortAscending() {
    const strAscending = [...filteredData].sort((a, b) =>
      a?.event?.name > b?.event?.name ? 1 : -1
    );
    setFilteredData(strAscending)
  }
  
  function handleSortDescending() {
    const strDescending = [...filteredData].sort((a, b) =>
    a?.event?.name > b?.event?.name ? -1 : 1
    );
    setFilteredData(strDescending)
  }

  function handleSelectSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortType = event.target.value;
    if (sortType === "Relevância") {
    } else if (sortType === "Crescente") {
      handleSortAscending();
    } else {
      handleSortDescending();
    }
  }

  useEffect(() => {
    setLoading(true);
    async function fetchEvents() {
      try {
        const { data } = await api.get(`events/findall`);
        setEventData(data);
        setFilteredData(
          search.length > 0
            ? data.filter((item: any) =>
                item?.event?.name?.toLowerCase().includes(search)
              )
            : data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [name, search]);

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

          {name && (
            <h2 className={styles["result-heading"]}>Resultados para: &quot;{name}&quot;</h2>
          )}
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
              <select
                className={styles["filter-control__select"]}
                onChange={handleSelectSort}
              >
                <option value="Relevância">Relevância</option>
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
