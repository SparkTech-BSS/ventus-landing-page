import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import { FiSearch } from "react-icons/fi";
import { api } from "services/api";
import { Loading } from "components/Loading";
import { CgClose } from "react-icons/cg";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  setClientData: Dispatch<SetStateAction<{ name: string; clientId: string }>>;
}

export function ClientListModal({
  isOpen,
  onRequestClose,
  setClientData,
}: Props) {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const [search, setSearch] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const { data } = await api.get(`/users/findallgeneric`);
        setUsers(
          [...data].sort((a, b) => (a?.firstName > b?.firstName ? 1 : -1))
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [count]);

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <div className={styles["content"]}>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <CgClose size={24} color="#1A2029" />
        </button>

        <h2 className={styles.heading}>Lista de Usuários</h2>

        <span className={styles.subheading}>
          Total de usuários: {users?.length}
        </span>

        <span className={styles["subheading-small"]}>
          Por favor selecione o usuário
        </span>

        <div className={styles["input-box"]}>
          <FiSearch size={22} className={styles["search-icon"]} />
          <input
            className={styles["search-input"]}
            placeholder="Pesquisar usuários"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <div className={styles.empty}>
                <span>Ups, parece que ocorreu um erro no servidor.</span>
              </div>
            ) : (
              <>
                {!users?.length ? (
                  <div className={styles.empty}>
                    <span>Ups parece que não possui usuário.</span>
                  </div>
                ) : (
                  <div className={`${styles["list"]}`}>
                    {filteredData?.map((item: any) => {
                      return (
                        <div
                          className={`${styles["list-item"]}`}
                          key={item?._id}
                        >
                          <div className={`${styles["list-item-heading-box"]}`}>
                            <span className={styles["list-item-heading"]}>
                              {item?.firstName} {item?.lastName}
                            </span>
                            <span className={styles["list-item-subheading"]}>{item?.email}</span>
                          </div>

                          <button
                            className={styles.btn}
                            onClick={() => {
                              setClientData({
                                clientId: item?._id,
                                name: `${item?.firstName} ${item?.lastName}`,
                              });
                              onRequestClose();
                            }}
                          >
                            Selecionar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
