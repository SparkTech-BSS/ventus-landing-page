import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "services/api";
import { VscCalendar } from "react-icons/vsc";
import * as Tabs from "@radix-ui/react-tabs";
import { Spinner } from "components/Spinner";
import { IoLocationOutline } from "react-icons/io5";
import styles from "./styles.module.scss";
import { CardDetailEvent } from "../CardDetailEvent";
import { CardFinanceDetail } from "../CardFinanceDetail";
import { CardReportChart } from "../CardReportChart";
import { getAllDateObject } from "utils";
import { Loading } from "components/Loading";
import { ServerError } from "components/ServerError";

export function EventDetail() {
  const [event, setEvent] = useState<any>({});
  const [totalGainByEvent, setTotalGainByEvent] = useState<any>();
  const [totalSoldByEvent, seTotalSoldByEvent] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const { id } = router.query;

  console.log(id);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const responseEvent = await api.get(`events/findbyid/${id}`);
        const responseTotalGainByEvent = await api.get(
          `tickets/gettotalgainbyevent/${id}`
        );
        const responseTotalSoldByEvent = await api.get(
          `tickets/gettotalsoldbyevent/${id}`
        );
        setEvent(responseEvent.data);
        setTotalGainByEvent(responseTotalGainByEvent?.data);
        seTotalSoldByEvent(responseTotalSoldByEvent.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (error) {
    return <ServerError/>
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles["event-detail"]}>
      <div className={styles["header"]}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={styles["heading-status"]}>
              <div className={`${styles["status-active"]}`} />{" "}
              <h1 className={styles["heading"]}>{event?.event?.name}</h1>
            </div>

            <div className={styles["items"]}>
              <span className={styles["item"]}>
                <VscCalendar size={20} />
                {getAllDateObject(event?.event?.dates[0])?.week_day},{" "}
                {event?.event?.dates[0]}, {event?.event?.startTime} –{" "}
                {`${
                  event?.event?.dates?.length > 0
                    ? getAllDateObject(
                        event?.event?.dates[event?.event?.dates.length - 1]
                      )?.week_day +
                      " " +
                      event?.event?.dates[event?.event?.dates.length - 1]
                    : ""
                }`}
                , {event?.event?.endTime}
              </span>

              <span className={styles["item"]}>
                <IoLocationOutline size={20} />
                {event?.event?.location}
              </span>
            </div>
          </>
        )}
      </div>

      <Tabs.Root
        className={styles["tabs"]}
        defaultValue="general"
        orientation="horizontal"
      >
        <Tabs.List
          aria-label="Dashboard"
          className={`${styles.container} ${styles["tabs-list"]}`}
        >
          <Tabs.Trigger value="general" className={styles["tabs-trigger"]}>
            MEUS EVENTOS
          </Tabs.Trigger>
          <Tabs.Trigger value="form" className={styles["tabs-trigger"]}>
            DASHBOARD
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="general" className={`${styles["tab-content"]}`}>
          <div className={styles.row}>
            <CardDetailEvent data={event}/>
            <CardFinanceDetail
              totalGain={totalGainByEvent}
              totalSold={totalSoldByEvent}
            />
          </div>
          <CardReportChart />
        </Tabs.Content>

        <Tabs.Content
          value="form"
          className={`${styles["tab-content"]}`}
        ></Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
