import { useEffect, useState } from "react";
import { api } from "services/api";
import { Loading } from "components/Loading";
import styles from "./styles.module.scss";
import { OrderItem } from "components/OrderItem";

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get(`orders/findbystatususerid/pending`);
        setOrders(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  

  return (
    <div className={styles.order}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!orders?.length ? (
            <div className={styles["empty-box"]}>
              <span className={styles.text}>
                Não há ingressos para próximos eventos
              </span>
              <button>Encontrar Eventos</button>
            </div>
          ) : (
            <>
              {orders?.map((item: any) => {
                return (
                  <OrderItem key={item?.order?._id} data={item}/>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
