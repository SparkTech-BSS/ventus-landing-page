import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { CardTableEvent } from "../CardTableEvent";
import styles from "./styles.module.scss";

export function DashboardContent() {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // async function fetchData() {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`events/findeventsbyuserid`);
  //     console.log(data);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <section className={styles["dashboard-content"]}>
      <Tabs.Root
        className={styles["tabs"]}
        defaultValue="events"
        orientation="horizontal"
      >
        <Tabs.List
          aria-label="Dashboard"
          className={`${styles.container} ${styles["tabs-list"]}`}
        >
          <Tabs.Trigger value="events" className={styles["tabs-trigger"]}>
            MEUS EVENTOS
          </Tabs.Trigger>
          <Tabs.Trigger value="dashboard" className={styles["tabs-trigger"]}>
            DASHBOARD
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="events" className={`${styles["tab-content"]}`}>
          <div className={`${styles.container}`}>
            <CardTableEvent />
          </div>
        </Tabs.Content>

        <Tabs.Content
          value="dashboard"
          className={`${styles["tab-content"]}`}
        ></Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
