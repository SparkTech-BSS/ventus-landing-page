import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "services/api";
import { Loading } from "components/Loading";
import { OrderItem } from "components/OrderItem";
import { ServerError } from "components/ServerError";
import styles from "./styles.module.scss";

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

  if (error) {
    return <ServerError />;
  }

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
              <Link href="/events" passHref>
                <button>Encontrar Eventos</button>
              </Link>
            </div>
          ) : (
            <>
              {orders?.map((item: any) => {
                return <OrderItem key={item?.order?._id} data={item} />;
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
