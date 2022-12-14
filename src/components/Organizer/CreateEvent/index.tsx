import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventDTO } from "../../../dto/EventDTO";
import { TicketLotDTO } from "dto/TicketLotDTO";
import { CgMathPlus } from "react-icons/cg";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { api } from "services/api";
import { Input } from "../Input";
import { Select } from "../Select";
import { Spinner } from "components/Spinner";
import MapPage from "../MapPage";
import { eventSchema } from "../../../validations/EventValidation";
import { addEventOnElem, removeEventOnElem } from "utils";
import { CreateTicketLotModal } from "../CreateTicketLotModal";
import { UploadImageEvent } from "../UploadImageEvent";
import RichTextEditor from "components/RichTextEditor";
import { CheckBox } from "components/CheckBox";
import { ProvinceData } from "data";
import { getProvincesDate } from "utils";
import { RATE_PRICE } from "config";
import { SwitchButton } from "../SwitchButton";
import { CheckedState } from "@radix-ui/react-checkbox";
import styles from "./styles.module.scss";

Modal.setAppElement("#__next");

export function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);
  const [ticketLot, setTicketLot] = useState<TicketLotDTO[]>([]);
  const [openCreateTicketModal, setOpenCreateTicketModal] = useState(false);
  const [acceptResponsibility, setAcceptResponsibility] =
    useState<CheckedState>(false);
  const [eventImage, setEventImage] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [ticketLotEditedData, setTicketLotEditedData] =
    useState<TicketLotDTO>();
  const [ticketLotFormMode, setTicketLotFormMode] = useState<"Create" | "Edit">(
    "Create"
  );

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<EventDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(eventSchema),
  });

  function handleOpenCreateTicketModal() {
    setOpenCreateTicketModal(true);
  }

  function handleCloseCreateTicketModal() {
    setOpenCreateTicketModal(false);
  }

  const activeElementOnScroll = function () {
    if (window.scrollY > 100) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };

  useEffect(() => {
    addEventOnElem(window, "scroll", activeElementOnScroll);

    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);

    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get("categories/findall");
        setCategories(
          data.map((item: any) => {
            return {
              label: item?.designation,
              value: item?._id,
            };
          })
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleRemoveTicketLotItem(id: string) {
    setTicketLot(ticketLot.filter((item: TicketLotDTO) => item?.id !== id));
  }

  const onSubmit: SubmitHandler<EventDTO> = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className={styles["create-event"]}>
        {loading && <Spinner />}
        <div
          className={`${styles["create-event-header"]} ${
            activeHeader && styles.active
          }`}
        >
          <div
            className={`container ${styles["create-event-header__wrapper"]} ${
              activeHeader && styles.active
            }`}
          >
            <h1
              className={`${styles["heading"]} ${
                activeHeader && styles.active
              }`}
            >
              Criar{" "}
              <span className={styles["heading-bold"]}>Evento Presencial</span>
            </h1>

            <div className={styles["btn-group"]}>
              <button
                className={`${styles["btn"]} ${styles["btn-full"]} ${
                  activeHeader && styles.active
                }`}
                type="submit"
                form="form:createEvent"
              >
                PUBLICAR EVENTO
              </button>
              <a
                className={`${styles["btn"]} ${styles["btn-outline"]} ${
                  activeHeader && styles.active
                }`}
              >
                PR??-VISUALIZAR
              </a>
              <a
                className={`${styles["btn"]} ${styles["btn-outline"]} ${
                  activeHeader && styles.active
                }`}
              >
                SALVAR RASCUNHO
              </a>
            </div>
          </div>
        </div>

        <form
          id="form:createEvent"
          onSubmit={handleSubmit(onSubmit)}
          className={`container ${styles["create-event-content"]}`}
        >
          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              1. Onde o evento ir?? acontecer?
            </h2>

            <span
              className={styles["card-box-subheading"]}
              style={{ marginBottom: 20 }}
            >
              Coloque o lugar onde ir?? decorrer o evento.
            </span>

            <Select
              label="Prov??ncia"
              options={getProvincesDate(ProvinceData)}
            />
            <Input
              label="Local"
              placeholder="Preencha o local do evento"
              requiredSymbol
              margin="2rem 0 2rem"
              {...register("location")}
              errorMessage={errors?.location?.message}
            />
            <MapPage />
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              2. Informa????es b??sicas
            </h2>
            <span className={styles["card-box-subheading"]}>
              Adicione as principais informa????es do evento.
            </span>
            <div className={`${styles["input-row"]}`}>
              <Input
                label="Nome do evento"
                requiredSymbol
                margin="2rem 0 2rem"
                placeholder="Nome do evento"
                {...register("name")}
                errorMessage={errors?.name?.message}
              />

              <Select
                label="Categoria"
                options={categories}
                {...register("category")}
                errorMessage={errors?.category?.message}
              />
            </div>

            <UploadImageEvent setEventImage={setEventImage} />

            {isSubmitted && !eventImage.length && (
              <span className={styles["error-message"]}>
                Imagem obrigat??rio
              </span>
            )}
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              3. Descri????o do evento
            </h2>
            <span className={styles["card-box-subheading"]}>
              Conte todos os detalhes do seu evento, como a programa????o e os
              diferenciais da sua produ????o!
            </span>

            <div className={`${styles["input-box"]}`}>
              <textarea
                className={`${styles["input-description"]}`}
                placeholder=""
                {...register("about")}
                style={{ marginTop: 40 }}
              />
            </div>
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              4. Data e hor??rio
            </h2>
            <span className={styles["card-box-subheading"]}>
              Informe aos participantes quando seu evento vai acontecer.
            </span>

            <div className={`${styles["input-row"]}`}>
              <Input
                label="Data de In??cio"
                requiredSymbol
                type="date"
                {...register("startDate")}
                errorMessage={errors?.startDate?.message}
              />

              <Input
                label="Hora de In??cio"
                requiredSymbol
                type="time"
                {...register("startTime")}
                errorMessage={errors?.startTime?.message}
              />

              <Input
                label="Data de T??rmino "
                requiredSymbol
                type="date"
                {...register("endDate")}
                errorMessage={errors?.endDate?.message}
              />

              <Input
                label="Hora de T??rmino"
                requiredSymbol
                type="time"
                {...register("endTime")}
                errorMessage={errors?.endTime?.message}
              />
            </div>
          </div>

          <div
            className={`${styles["card-box"]} ${styles["card-box-configuration"]}`}
          >
            <h2 className={`${styles["card-box-heading"]}`}>5. Ingressos</h2>
            <span className={styles["card-box-subheading-center"]}>
              Que tipo de ingresso voc?? deseja criar?
            </span>

            <span
              className={`${styles["card-box-subheading-required-center"]}`}
            >
              ?? obrigat??ria a cria????o de pelo menos um tipo de Ingresso.
            </span>

            <div className={`${styles["ticket-btn-group"]}`}>
              <button
                className={`${styles["ticket-btn"]}`}
                onClick={() => {
                  handleOpenCreateTicketModal();
                  setTicketLotFormMode("Create");
                }}
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

            {ticketLot.length ? (
              <div className={styles["table-wrapper"]}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">TIPO</th>
                      <th scope="col">VENDIDOS/TOTAL</th>
                      <th scope="col">VALOR</th>
                      <th scope="col">TAXA</th>
                      <th scope="col">A????es</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ticketLot.map((item: TicketLotDTO) => {
                      return (
                        <tr key={item?.id}>
                          <td>{item?.type}</td>
                          <td>
                            <span className={styles["ticket"]}>
                              <span>0</span>
                              <span>{item?.qtdTotal}</span>
                            </span>
                          </td>
                          <td>
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "AOA",
                            }).format(item?.price)}
                          </td>
                          <td>
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "AOA",
                            }).format(RATE_PRICE)}
                          </td>
                          <td>
                            <span className={styles["actions"]}>
                              <button
                                className={`${styles["btn-actions"]}`}
                                title="Editar"
                                onClick={() => {
                                  setTicketLotEditedData(item);
                                  handleOpenCreateTicketModal();
                                  setTicketLotFormMode("Edit");
                                }}
                                type="button"
                              >
                                <AiOutlineEdit size={22} />
                              </button>
                              <button
                                className={`${styles["btn-actions"]}`}
                                title="Remover"
                                onClick={() => {
                                  handleRemoveTicketLotItem(item.id!);
                                }}
                              >
                                <BsTrash size={22} />
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            <div className={`${styles["card-configuration"]}`}>
              <h3 className={`${styles["card-configuration-heading"]}`}>
                Configura????es
              </h3>

              <div className={styles["card-configuration-row"]}>
                <div className={styles["card-configuration-box-row"]}>
                  <SwitchButton />

                  <label>Absorver a taxa de servi??o</label>
                </div>

                <div className={styles["card-configuration-box-row"]}>
                  <label>Nomenclatura</label>

                  <select className={`${styles["card-configuration-select"]}`}>
                    <option value="Ingresso">Ingresso</option>
                    <option value="Inscri????o">Inscri????o</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles["card-box"]}`}>
            <h2 className={`${styles["card-box-heading"]}`}>
              6. Sobre o produtor
            </h2>
            <span className={styles["card-box-subheading"]}>
              Conte um pouco sobre voc?? ou a sua empresa. ?? importante mostrar
              ao p??blico quem est?? por tr??s do evento, dando mais credibilidade
              ?? sua produ????o.
            </span>

            <Input
              label="Nome da organizadora"
              requiredSymbol
              margin="2rem 0 2rem"
              placeholder="Preencha o nome da organizadora"
              {...register("organizerName")}
              errorMessage={errors?.organizerName?.message}
            />

            <div className={`${styles["input-box"]}`}>
              <label className={styles["input-box-label"]}>
                Descri????o do produtor (opcional)
              </label>

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
                <Controller
                  control={control}
                  name="acceptResponsibility"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CheckBox onCheckedChange={onChange} />
                  )}
                />
              </div>

              <p className={styles["responsibility-text"]}>
                Ao publicar este evento, estou de acordo com os{" "}
                <Link href="/terms-of-use">Termos de uso</Link>, com as
                Diretrizes de Comunidade e com o Acordo de Processamento de
                Dados, bem como declaro estar ciente da Pol??tica de Privacidade,
                da Pol??tica de Cookies e das Obrigatoriedades Legais.
              </p>
            </div>
            <span className={styles["error-message-accept-responsibility"]}>
              {errors?.acceptResponsibility?.message}
            </span>
          </div>
        </form>
      </section>

      <CreateTicketLotModal
        isOpen={openCreateTicketModal}
        onRequestClose={handleCloseCreateTicketModal}
        ticketLotFormMode={ticketLotFormMode}
        setTicketLot={setTicketLot}
        ticketLotEditedData={ticketLotEditedData}
        ticketLot={ticketLot}
      />
    </>
  );
}
