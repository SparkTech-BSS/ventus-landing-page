import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "services/api";
import { Loading } from "components/Loading";
import { getAllDateObject } from "utils";
import styles from "./styles.module.scss";

interface Props {
  ticketData: any;
}

export function CardTicketLot({ ticketData }: Props) {
  const [loading, setLoading] = useState(false);
  const [totalGain, setTotalGain] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  async function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setLoading(true);
    try {
      const responseTotal = await api.get(
        `tickets/gettotalbyticketlot/${id}/${value}`
      );
      setTotalGain(responseTotal.data.totalGain);
      setTotalSold(responseTotal.data.totalSold);


    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const responseTotal = await api.get(
          `/tickets/gettotalbyticketlot/${id}/${ticketData[0]?._id}`
        );
        setTotalGain(responseTotal.data.totalGain);
        setTotalSold(responseTotal.data.totalSold);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, ticketData]);

  return (
    <div className={styles["card-ticket-lot"]}>
      <h2 className={styles.heading}>VENDAS POR LOTE</h2>

      <div className={styles.block}>
        <label>Filtrar por Lote: </label>
        <select
          className={styles["filter-control__select"]}
          onChange={handleSelect}
        >
          {ticketData.map((item: any) => {
            return (
              <option key={item?._id} value={item?._id}>{` ${
                getAllDateObject(item?.date)?.week_day
              }`}</option>
            );
          })}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles["item-heading"]}>Vendas Totais</span>
              <span
                className={`${styles["item-price"]} ${styles["total-sale"]}`}
              >
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "AOA",
                }).format(totalGain ? totalGain : 0)}
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles["item-heading"]}>Tickets Vendidos</span>
              <span
                className={`${styles["item-price"]} ${styles["total-price"]}`}
              >
                {totalSold ? totalSold : 0}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
