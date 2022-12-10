import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { Loading } from "../../Loading";
import { BiLinkExternal } from "react-icons/bi";
import styles from "./styles.module.scss";

export function CardTableOrganizer() {
  return (
    <div className={styles["card-table-organizer"]}>
      <div className={styles["card-table-organizer-header"]}>
        <div className={styles["card-table-organizer-header__block"]}>
          <label>Buscar pelo nome do organizador </label>
          <div className={styles["input-box"]}>
            <FiSearch size={22} className={styles["search-icon"]} />
            <input
              className={styles["search-input"]}
              placeholder="Pesquisar organizador"
            />
          </div>
        </div>

        <div className={styles["card-table-organizer-header__block"]}>
          <label>Filtrar por </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>

        <div className={styles["card-table-organizer-header__block"]}>
          <label>Compartilhamento </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>

        <div className={styles["card-table-organizer-header__block"]}>
          <label>Ordenar </label>
          <select className={styles["filter-control__select"]}>
            <option>Crescente</option>
            <option>Descrescente</option>
          </select>
        </div>

        <div className={styles["card-table-organizer-header__box"]}>
          <button
            className={
              styles["card-table-organizer-header__box--button-outline"]
            }
          >
            FILTRAR
          </button>
          <button
            className={
              styles["card-table-organizer-header__box--button-transparent"]
            }
          >
            LIMPAR FILTRO
          </button>
        </div>
      </div>

      <div className={styles["table-wrapper"]}>
        <table>
          <thead>
            <tr>
              <th scope="col">ESTADO</th>
              <th scope="col">NOME</th>
              <th scope="col">ORGANIZAÇÃO</th>
              <th scope="col">EVENTOS</th>
              <th scope="col">AÇÕES</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className={styles.active}>Activo</td>
              <td>Mauro</td>
              <td>PUZZLE</td>
              <td>3</td>

              <td>
                <span className={styles["actions"]}>
                  <button
                    className={`${styles["btn-outline"]}`}
                    title="GERENCIAR"
                  >
                    GERENCIAR
                  </button>
                  
                  <Link href={``} passHref>
                    <button
                      className={`${styles["btn-actions"]}`}
                      title="Visualizar"
                    >
                      <BiLinkExternal size={22} />
                    </button>
                  </Link>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
