import Link from "next/link";
import { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { Context } from "../../../contexts/AppContext";
import { useRouter } from "next/router";
import { EventIconSVG, TicketIconSVG } from "../SideBarIcon";
import styles from "./styles.module.scss";

export function Sidebar() {
  const { toggleSidebar, setToggleSidebar } = useContext(Context);
  const router = useRouter();

  const { id } = router.query;

  return (
    <aside className={`${styles["sidebar"]} ${toggleSidebar && styles.active}`}>
      <button
        className={`${styles["close-btn"]}`}
        onClick={() => setToggleSidebar(false)}
      >
        <CgClose size={24} />
      </button>
      <ul className={styles["nav-list"]}>
        <li>
          <Link href={`/organizer/event-detail/${id}`} passHref>
            <a
              className={`${styles["nav-link"]} ${
                router.pathname.includes("/organizer/event-detail/") &&
                styles.active
              }`}
            >
              <EventIconSVG
                active={
                  router.pathname == "/organizer/event-detail" ? true : false
                }
              />
              Painel do evento
            </a>
          </Link>
        </li>

        {/* <li>
          <Link href="/organizer/tickets" passHref>
            <a
              className={`${styles["nav-link"]} ${
                router.pathname == "/organizer/tickets" && styles.active
              }`}
            >
              <TicketIconSVG
                active={router.pathname == "/organizer/tickets" ? true : false}
              />
              Ingressos
            </a>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
}
