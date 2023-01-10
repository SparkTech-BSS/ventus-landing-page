import Link from "next/link";
import Image from "next/future/image";
import { ManagementSettingICON, UsersICON, PlainTicketICON } from "../../Icon";
import OrganizerPicture from "../../../assets/png/for-organizer/organizer-1.png";
import styles from "./styles.module.scss";

export function ForOrganizer() {
  return (
    <section
      className={`section ${styles["for-organizer"]}`}
      id="event"
      aria-label="for-organizer"
    >
      <div className={`container ${styles.container}`}>
        <h1 className={`section-heading`}>Para produtores de eventos</h1>

        <div className={`${styles["for-organizer-wrapper"]}`}>
          <div className={`${styles["for-organizer-wrapper__col--left"]}`}>
            <Image
              src={OrganizerPicture}
              alt=""
              className={`${styles["for-organizer-wrapper__col--left____image"]}`}
            />
            <h1
              className={`${styles["for-organizer-wrapper__col--left____heading"]}`}
            >
              Publique e venda ingressos na Ventus
            </h1>
            <p
              className={`${styles["for-organizer-wrapper__col--left____text"]}`}
            >
              A Ventus oferece aos produtores de eventos gestão financeira, de
              marketing, remarketing e gerenciamento do publico alvo que
              acompanha seus eventos.
            </p>

            <div className={`${styles["btn-group"]}`}>
              <Link href="/be-organizer">
                <button className={`${styles["btn"]} ${styles["btn-full"]}`}>
                  Publicar Evento
                </button>
              </Link>
              <button className={`${styles["btn"]} ${styles["btn-outline"]}`}>
                Fale Conosco
              </button>
            </div>
          </div>

          <div className={`${styles["for-organizer-wrapper__col--right"]}`}>
            <div className={styles["row-col"]}>
              <div className={styles.list}>
                <div className={styles["list-item"]}>
                  <div className={styles["list-item-icon"]}>
                    <ManagementSettingICON />
                  </div>

                  <div className={styles["list-item-content"]}>
                    <h3 className={styles["list-item-content__title"]}>
                      Gerencie quantos eventos quiser
                    </h3>
                    <p className={styles["list-item-content__text"]}>
                      Aqui você pode gerenciar eventos simultaneos, tendo um
                      controle de todos os eventos que você já fez ou está a
                      fazer
                    </p>
                  </div>
                </div>

                <div className={styles["list-item"]}>
                  <div className={styles["list-item-icon"]}>
                    <UsersICON />
                  </div>

                  <div className={styles["list-item-content"]}>
                    <h3 className={styles["list-item-content__title"]}>
                      Faça Marketing e Remarketing de forma facilitada dos seus
                      eventos
                    </h3>
                    <p className={styles["list-item-content__text"]}>
                      Com a Ventus você pode enviar e-mail, fazer o remarketing
                      para os seus leads e atingir seu publico com eficiencia
                    </p>
                  </div>
                </div>

                <div className={styles["list-item"]}>
                  <div className={styles["list-item-icon"]}>
                    <PlainTicketICON />
                  </div>

                  <div className={styles["list-item-content"]}>
                    <h3 className={styles["list-item-content__title"]}>
                      Faça Marketing e Remarketing de forma facilitada dos seus
                      eventos
                    </h3>
                    <p className={styles["list-item-content__text"]}>
                      Com a Ventus você pode enviar e-mail, fazer o remarketing
                      para os seus leads e atingir seu publico com eficiencia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
