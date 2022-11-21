import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { CgMathPlus } from "react-icons/cg";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Input } from "../Input";
import { Select } from "../Select";
import MapPage from "../MapPage";
import { CreateTickeModal } from "../CreateTicketModal";
import { UploadImageEvent } from "../UploadImageEvent";
import RichTextEditor from "components/RichTextEditor";
import { CheckBox } from "components/CheckBox";
import { ProvinceData } from "data";
import { getProvincesDate } from "utils";
import styles from "./styles.module.scss";

Modal.setAppElement("#__next");

export function CreateEvent() {
  const [openCreateTicketModal, setOpenCreateTicketModal] = useState(false);

  function handleOpenCreateTicketModal() {
    setOpenCreateTicketModal(true);
  }

  function handleCloseCreateTicketModal() {
    setOpenCreateTicketModal(false);
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <>
      <section className={styles["create-event"]}>
        <div className={styles["create-event-header"]}>
          <div
            className={`container ${styles["create-event-header__wrapper"]}`}
          >
            <h1 className={styles["heading"]}>
              Criar{" "}
              <span className={styles["heading-bold"]}>Evento Presencial</span>
            </h1>

            <div className={styles["btn-group"]}>
              <a className={`${styles["btn"]} ${styles["btn-full"]}`}>
                PUBLICAR EVENTO
              </a>
              <a className={`${styles["btn"]} ${styles["btn-outline"]}`}>
                PRÉ-VISUALIZAR
              </a>
              <a className={`${styles["btn"]} ${styles["btn-outline"]}`}>
                SALVAR RASCUNHO
              </a>
            </div>
          </div>
        </div>

        <form className={`container ${styles["create-event-content"]}`}>
          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              1. Onde o evento irá acontecer?
            </h2>

            <span
              className={styles["card-box-subheading"]}
              style={{ marginBottom: 20 }}
            >
              Coloque o lugar onde irá decorrer o evento.
            </span>

            <Select
              label="Província"
              options={getProvincesDate(ProvinceData)}
            />
            <Input label="Local" requiredSymbol margin="2rem 0 2rem" />
            <MapPage />
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              2. Informações básicas
            </h2>
            <span className={styles["card-box-subheading"]}>
              Adicione as principais informações do evento.
            </span>

            <Input
              label="Nome do evento"
              requiredSymbol
              margin="2rem 0 2rem"
              placeholder="Nome do evento"
            />

            <UploadImageEvent />
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              3. Descrição do evento
            </h2>
            <span className={styles["card-box-subheading"]}>
              Conte todos os detalhes do seu evento, como a programação e os
              diferenciais da sua produção!
            </span>

            <div className={`${styles["input-box"]}`}>
              <textarea
                className={`${styles["input-description"]}`}
                placeholder=""
                style={{ marginTop: 40 }}
              />
            </div>
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              4. Data e horário
            </h2>
            <span className={styles["card-box-subheading"]}>
              Informe aos participantes quando seu evento vai acontecer.
            </span>

            <div className={`${styles["input-row"]}`}>
              <Input
                label="Data de Início"
                requiredSymbol
                type="date"
                placeholder="Nome do evento"
              />

              <Input
                label="Hora de Início"
                requiredSymbol
                type="time"
                placeholder="Nome do evento"
              />

              <Input
                label="Data de Término "
                requiredSymbol
                type="date"
                placeholder="Nome do evento"
              />

              <Input
                label="Hora de Término"
                requiredSymbol
                type="time"
                placeholder="Nome do evento"
              />
            </div>
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>5. Ingressos</h2>
            <span className={styles["card-box-subheading-center"]}>
              Que tipo de ingresso você deseja criar?
            </span>

            <span
              className={`${styles["card-box-subheading-required-center"]}`}
            >
              É obrigatória a criação de pelo menos um tipo de Ingresso.
            </span>

            <div className={`${styles["ticket-btn-group"]}`}>
              <button
                className={`${styles["ticket-btn"]}`}
                onClick={handleOpenCreateTicketModal}
                type="button"
              >
                <CgMathPlus size={20} />
                INGRESSO PAGO
              </button>

              <button
                className={`${styles["ticket-btn"]}`}
                onClick={handleOpenCreateTicketModal}
                type="button"
              >
                <CgMathPlus size={20} />
                INGRESSO Gratuito
              </button>
            </div>

            <div className={styles["table-wrapper"]}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">TIPO</th>
                    <th scope="col">VENDIDOS/TOTAL</th>
                    <th scope="col">VALOR</th>
                    <th scope="col">TAXA</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Lote Masculino</td>
                    <td>
                      <span className={styles["ticket"]}>
                        <span>0</span>
                        <span>200</span>
                      </span>
                    </td>
                    <td>kz5,000.00</td>
                    <td>kz350.00</td>
                    <td>
                      <span className={styles["actions"]}>
                        <button
                          className={`${styles["btn-actions"]}`}
                          title="Editar"
                        >
                          <AiOutlineEdit size={22} />
                        </button>
                        <Link
                          // href={`/organizer/event-detail/${item?._id}`}
                          href=""
                          passHref
                        >
                          <button
                            className={`${styles["btn-actions"]}`}
                            title="Visualizar"
                          >
                            <BsTrash size={22} />
                          </button>
                        </Link>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              6. Sobre o produtor
            </h2>
            <span className={styles["card-box-subheading"]}>
              Conte um pouco sobre você ou a sua empresa. É importante mostrar
              ao público quem está por trás do evento, dando mais credibilidade
              à sua produção.
            </span>

            <Input
              label="Nome"
              requiredSymbol
              margin="2rem 0 2rem"
              placeholder="Nome do evento"
            />

            <div className={`${styles["input-box"]}`}>
              <label>Descrição do produtor (opcional)</label>

              <textarea
                className={`${styles["input-description"]}`}
                placeholder=""
              />
            </div>
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              7. Responsabilidades
            </h2>

            <div className={styles["responsibility-wrapper"]}>
              <div>
                <CheckBox />
              </div>

              <p className={styles["responsibility-text"]}>
                Ao publicar este evento, estou de acordo com os{" "}
                <Link href="/terms-of-use">Termos de uso</Link>, com as
                Diretrizes de Comunidade e com o Acordo de Processamento de
                Dados, bem como declaro estar ciente da Política de Privacidade,
                da Política de Cookies e das Obrigatoriedades Legais.
              </p>
            </div>
          </div>
        </form>
      </section>

      <CreateTickeModal
        isOpen={openCreateTicketModal}
        onRequestClose={handleCloseCreateTicketModal}
      />
    </>
  );
}
