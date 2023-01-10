import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

export function ProfileLayout({ children }: Props) {
  return <main className={styles.main}>{children}</main>;
}
