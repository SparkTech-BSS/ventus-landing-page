import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { Loading } from "../../Loading";
import { BiLinkExternal } from "react-icons/bi";
import styles from "./styles.module.scss";

export function CardTableEvent() {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await api.get(`events/findeventsbyuserid`);
      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles["card-table-event"]}>
      <div className={styles["card-table-event-header"]}>
        <div className={styles["card-table-event-header__block"]}>
          <label>Buscar pelo nome do evento </label>
          <div className={styles["input-box"]}>
            <FiSearch size={22} className={styles["search-icon"]} />
            <input
              className={styles["search-input"]}
              placeholder="Pesquisar evento"
            />
          </div>
        </div>

        <div className={styles["card-table-event-header__block"]}>
          <label>Filtrar por </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>

        <div className={styles["card-table-event-header__block"]}>
          <label>Compartilhamento </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>

        <div className={styles["card-table-event-header__block"]}>
          <label>Ordenar </label>
          <select className={styles["filter-control__select"]}>
            <option>Crescente</option>
            <option>Descrescente</option>
          </select>
        </div>

        <div className={styles["card-table-event-header__box"]}>
          <button
            className={styles["card-table-event-header__box--button-outline"]}
          >
            FILTRAR
          </button>
          <button
            className={
              styles["card-table-event-header__box--button-transparent"]
            }
          >
            LIMPAR FILTRO
          </button>
        </div>
      </div>

      <div className={styles["table-wrapper"]}>
        {loading ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">ESTADO</th>
                <th scope="col">EVENTO</th>
                <th scope="col">Data</th>
                <th scope="col">ONDE</th>
                <th scope="col">INGRESSOS</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              {events?.map((item: any) => {
                return (
                  <tr key={item?._id}>
                    <td className={styles.active}>Publicado</td>
                    <td>{item?.name}</td>
                    <td>{item?.dates[0]}</td>
                    <td>{item?.location}</td>
                    <td>
                      <span className={styles["ticket"]}>
                        <span>0</span>
                        <span>200</span>
                      </span>
                    </td>
                    <td>
                      <span className={styles["actions"]}>
                        <button
                          className={`${styles["btn-outline"]}`}
                          title="GERENCIAR"
                        >
                          GERENCIAR
                        </button>
                        <button
                          className={`${styles["btn-actions"]}`}
                          title="Editar"
                        >
                          <AiOutlineEdit size={22} />
                        </button>
                        <Link href={`/organizer/event-detail/${item?._id}`} passHref>
                          <button
                            className={`${styles["btn-actions"]}`}
                            title="Visualizar"
                          >
                            <BiLinkExternal size={22} />
                          </button>
                        </Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
