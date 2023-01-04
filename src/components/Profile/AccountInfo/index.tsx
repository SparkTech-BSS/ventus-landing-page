import { useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ProfileCoverImageCard } from "../ProfileCoverImageCard";
import { ProfileImageCard } from "../ProfileImageCard";
import { Input } from "components/Input";
import styles from "./styles.module.scss";

export function AccountInfo() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={`${styles["container"]}`}>
      <form>
        <h1 className={`${styles["heading"]}`}>Informações da Conta</h1>

        <div className={styles.divider} />

        <Tabs.Root className="TabsRoot" defaultValue="ORGANIZER">
          <div className={`${styles["account-info-box"]}`}>
            <h2 className={`${styles["subheading"]}`}>Foto de perfil</h2>

            <Tabs.List
              className={`${styles["btn-group"]}`}
              aria-label="Informações da conta"
            >
              <Tabs.Trigger className={`${styles["btn"]}`} value="ORGANIZER">
                ORGANIZADOR
              </Tabs.Trigger>
              <Tabs.Trigger className={`${styles["btn"]}`} value="BUYER">
                COMPRADOR
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          <ProfileImageCard />

          <Tabs.Content className="TabsContent" value="ORGANIZER">
            <div className={`${styles["account-info-box"]}`}>
              <h2 className={`${styles["subheading"]}`}>
                Foto de Capa de Perfil
              </h2>
            </div>

            <ProfileCoverImageCard />

            <div className={`${styles["account-info-box"]}`}>
              <h2 className={`${styles["subheading"]}`}>
                Dados do organizador
              </h2>
            </div>

            <div className={`${styles["input-controller-wrapper"]}`}>
              <div className={`${styles["input-group"]}`}>
                <Input label="Primeiro Nome" requiredSymbol />

                <Input label="Sobrenome" requiredSymbol />
              </div>

              <div className={`${styles["input-group"]}`}>
                <Input label="Nome da empresa" requiredSymbol />

                <Input label="Telefone" type="number" requiredSymbol />
              </div>

              <div className={`${styles["input-group"]}`}>
                <Input label="Primeiro Nome" requiredSymbol />

                <Input label="Primeiro Nome" requiredSymbol />
              </div>

              <div className={`${styles["input-group"]}`}>
                <Input label="NIF" requiredSymbol />

                <Input label="Endereço" requiredSymbol />
              </div>
            </div>

            <div className={styles.divider} />

            <button className={`${styles["btn"]} ${styles["btn-submit"]}`}>
              SALVAR ALTERAÇÕES
            </button>
          </Tabs.Content>

          <Tabs.Content className="TabsContent" value="BUYER">
            <div className={`${styles["account-info-box"]}`}>
              <h2 className={`${styles["subheading"]}`}>Dados do comprador</h2>
            </div>

            <div className={`${styles["input-controller-wrapper"]}`}>
              <div className={`${styles["input-group"]}`}>
                <Input label="Primeiro Nome" requiredSymbol />

                <Input label="Sobrenome" requiredSymbol />
              </div>

              <div className={`${styles["input-group"]}`}>
                <Input label="Telefone" type="number" requiredSymbol />

                <Input label="Endereço" requiredSymbol />
              </div>
            </div>

            <div className={styles.divider} />

            <button className={`${styles["btn"]} ${styles["btn-submit"]}`}>
              SALVAR ALTERAÇÕES
            </button>
          </Tabs.Content>
        </Tabs.Root>
      </form>
    </section>
  );
}
