import Link from "next/link";
import { useRouter } from "next/router";
import { EventIconSVG, TicketIconSVG } from "../SideBarIcon";
import styles from "./styles.module.scss";

export function Sidebar() {
  const router = useRouter();

  return (
    <nav className={styles["sidebar"]}>
      <ul className={styles["nav-list"]}>
        <li>
          <Link href="/organizer/event-detail" passHref>
            <a
              className={`${styles["nav-link"]} ${
                router.pathname.includes("/organizer/event-detail/") && styles.active
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
    </nav>
  );
}
