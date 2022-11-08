import { useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { CardTableEvent } from "../CardTableEvent";
import styles from "./styles.module.scss";

export function DashboardContent() {

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

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
