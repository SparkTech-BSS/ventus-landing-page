import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Collapsible from "@radix-ui/react-collapsible";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "./styles.module.scss";

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <aside className={`${styles["sidebar"]}`}>
      <Collapsible.Root
        className="CollapsibleRoot"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Trigger asChild>
          <button className={`${styles["btn-toggle-sidebar"]}`}>
            Conta{" "}
            {open ? <IoIosArrowDown size={24} /> : <IoIosArrowUp size={24} />}
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content className={`${styles["CollapsibleContent"]}`}>
          <ul className={styles["nav-list"]}>
            <li>
              <Link href="/profile/account-info" passHref>
                <a
                  className={`${styles["nav-link"]} ${
                    router.pathname.includes("/profile/account-info") &&
                    styles.active
                  }`}
                >
                  Informações da conta
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile/change-email" passHref>
                <a
                  className={`${styles["nav-link"]} ${
                    router.pathname.includes("/profile/change-email") &&
                    styles.active
                  }`}
                >
                  Alterar e-mail/senha
                </a>
              </Link>
            </li>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
      {/* <button className={`${styles["btn-toggle-sidebar"]}`}>
        Conta <IoIosArrowDown size={24} />
      </button> */}
    </aside>
  );
}
