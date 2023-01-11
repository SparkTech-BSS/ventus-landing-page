import styles from "./styles.module.scss";
//<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

interface SearchProps {
  textTitle?: string;
}

export function Search({ textTitle = "Aqui" }:SearchProps) {
  return (
    <section className={styles.search}>
      <div className={styles.content}>
        <div className={styles.input_search}>
          <i className={styles["bx bx-search"]}></i>
          <input
            className={styles.input_search}
            type="text"
            placeholder="pesquisar"
          />
        </div>
        <h2 className={styles.title}>{textTitle}</h2>
      </div>
    </section>
  );
}
