import React, { useEffect } from "react";
import { Sidebar } from "../Sidebar";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <main className={styles["main"]}>
      <Sidebar />

      <div className={styles["wrapper"]}>{children}</div>
    </main>
  );
}
