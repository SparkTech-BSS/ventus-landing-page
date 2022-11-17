import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { Loading } from "components/Loading";
import { api } from "services/api";
import { OrdersModal } from "../OrdersModal";
import { CustomPagination } from "../../CustomPagination";
import { ServerError } from "components/ServerError";
import styles from "./styles.module.scss";

Modal.setAppElement("#__next");

export function ListOfUserReference() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [openOrdersModal, setOpenOrdersModal] = useState(false);
  const [search, setSearch] = useState<any>([]);
  const [userId, setUserId] = useState();
  const [count, setCount] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [error, setError] = useState(false);

  function handleSortAscending() {
    const strAscending = [...filteredData].sort((a, b) =>
      a?.firstName > b?.firstName ? 1 : -1
    );
    setFilteredData(strAscending);
  }

  function handleSortDescending() {
    const strDescending = [...filteredData].sort((a, b) =>
      a?.firstName > b?.firstName ? -1 : 1
    );
    setFilteredData(strDescending);
  }

  function handleSelectSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortType = event.target.value;
    if (sortType === "Crescente") {
      handleSortAscending();
    } else {
      handleSortDescending();
    }
  }

  function handleOpenOrdersModal() {
    setOpenOrdersModal(true);
  }

  function handleCloseOrdersModal() {
    setOpenOrdersModal(false);
  }

  function onPageChange(page: number) {
    setCount(page);
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`users/findallgeneric`);
      setUsers(
        [...data].sort((a, b) => (a?.firstName > b?.firstName ? 1 : -1))
      );
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFilteredData(
      search.length > 0
        ? users.filter(
            (item: any) =>
              item?.firstName
                ?.toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              item?.lastName
                ?.toLowerCase()
                .includes(search.trim().toLowerCase())
          )
        : users
    );
  }, [search, users]);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
    fetchData();
  }, [fetchData]);

  if (error) {
    return <ServerError />;
  }

  return (
    <>
      <section className={`${styles["check-existence-of-tickets"]}`}>
        <div className={`container ${styles.container}`}>
          <div className={styles["breadcrumbs"]}>
            <Link href="/support" passHref>
              <a className={`${styles["breadcrumbs-link"]}`}>Home</a>
            </Link>

            <IoIosArrowForward size={16} color="#AAAAAA" />

            <Link href="/support/generate-reference" passHref>
              <a className={`${styles["breadcrumbs-link"]}`}>
                Gerar Referência
              </a>
            </Link>

            <IoIosArrowForward size={16} color="#AAAAAA" />

            <Link
              href="/support/generate-reference/list-of-user-reference"
              passHref
            >
              <a
                className={`${styles["breadcrumbs-link"]} ${styles["breadcrumbs-active-link"]}`}
              >
                Lista de Usuários
              </a>
            </Link>
          </div>

          <div className={styles["card-table-event"]}>
            <span className={styles.total}>Total de clientes: {users?.length}</span>
            <div className={styles["card-table-event-header"]}>
              <div
                className={`${styles["card-table-event-header__block"]} ${styles["card-table-event-header__block-full"]}`}
              >
                <label>Buscar pelo nome do usuário </label>
                <div className={styles["input-box"]}>
                  <FiSearch size={22} className={styles["search-icon"]} />
                  <input
                    className={styles["search-input"]}
                    placeholder="Pesquisar clientes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles["card-table-event-header__block"]}>
                <label>Ordenar </label>
                <select
                  className={styles["filter-control__select"]}
                  onChange={handleSelectSort}
                >
                  <option value="Crescente">Crescente</option>
                  <option value="Descrescente">Descrescente</option>
                </select>
              </div>
            </div>

            <div className={styles["table-wrapper"]}>
              {loading ? (
                <Loading />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Contacto</th>
                      <th scope="col">AÇÕES</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData?.map((item: any) => {
                      return (
                        <tr key={item?._id}>
                          <td>
                            {item?.firstName} {item?.lastName}
                          </td>
                          <td>{item?.email}</td>
                          <td>{item?.phone}</td>
                          <td>
                            <span className={styles["actions"]}>
                              <button
                                className={`${styles["btn-outline"]}`}
                                title="Verificar Referência"
                                onClick={() => {
                                  handleOpenOrdersModal();
                                  setUserId(item?._id);
                                }}
                              >
                                Verificar Referências
                              </button>
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
        </div>
      </section>

      <OrdersModal
        isOpen={openOrdersModal}
        onRequestClose={handleCloseOrdersModal}
        userId={userId}
      />
    </>
  );
}
