import { useEffect, Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { Input } from "../Input";
import { TicketLotDTO } from "dto/TicketLotDTO";
import { RATE_PRICE } from "config";
import { convertTwoDatesToMilliseconds } from "utils";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  ticketLotFormMode: "Create" | "Edit";
  setTicketLot: Dispatch<SetStateAction<TicketLotDTO[]>>;
  ticketLotEditedData?: TicketLotDTO;
  ticketLot: TicketLotDTO[];
  eventStartDate: string | Date;
  eventEndDate: string | Date;
}

export function CreateTicketLotModal({
  isOpen,
  onRequestClose,
  ticketLotFormMode,
  setTicketLot,
  ticketLotEditedData,
  ticketLot,
  eventStartDate,
  eventEndDate,
}: Props) {
  const ticketLotSchema = Yup.object().shape({
    type: Yup.string().required("Título obrigatório"),
    date: Yup.date()
      .required("Campo é obrigatório")
      .typeError("Campo inválido")
      .test({
        name: "dateCompareIfLower",
        exclusive: false,
        params: {},
        message: "Um ingresso não pode ser publicado no passado",
        test: function (value: any) {
          return !(new Date(value) < new Date());
        },
      })
      .test({
        name: "startDateCompareWithStartDateEventSmaller",
        message:
          "Data de ínicio não pode ser inferior a data de ínicio do evento",
        test: function (value: any) {
          const { dateOne, dateTwo } = convertTwoDatesToMilliseconds(
            value,
            eventStartDate
          );

          return dateOne >= dateTwo;
        },
      })
      .test({
        name: "startDateCompareWithStartDateEventLarger",
        message:
          "Data de ínicio não pode ser superior a data de termino do evento",
        test: function (value: any) {
          return new Date(value) <= new Date(eventEndDate);
        },
      }),
    price: Yup.number()
      .min(1, "Preço deve ser superior a zero")
      .required("Preço obrigatório")
      .typeError("Campo inválido"),
    qtdTotal: Yup.number()
      .min(1, "Quantidade deve ser superior a zero")
      .required("Quantidade total obrigatório")
      .typeError("Campo inválido"),
    qtdTotalPerUser: Yup.number()
      .min(1, "Quantidade permitida por compra deve ser superior a zero")
      .required("Quantidade permitida por compra obrigatório")
      .test({
        name: "max",
        message:
          "A quantidade máxima permitido para compra não deve ser superior a quantidade de ingresso disponível.",
        test: function (value) {
          if (value! > this.parent.qtdTotal) {
            return false;
          }
          return true;
        },
      })
      .typeError("Campo inválido"),
  });

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketLotDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(ticketLotSchema),
  });

  const totalBuyer = Number(watch("price")) + RATE_PRICE;

  const onSubmit: SubmitHandler<TicketLotDTO> = (data) => {
    if (ticketLotFormMode === "Create") {
      const formattedData = {
        ...data,
        id: uuidv4(),
        date: format(new Date(data!.date!), "yyyy-MM-dd"),
      };

      setTicketLot((prevState: TicketLotDTO[]) => [
        ...prevState,
        formattedData,
      ]);
    } else {
      let index = ticketLot.findIndex(
        (object) => object?.id === ticketLotEditedData?.id
      );
      let ticketLotArray = [...ticketLot];
      ticketLotArray[index] = {
        ...data,
        id: ticketLotEditedData?.id,
        date: format(new Date(data!.date!), "yyyy-MM-dd"),
      };
      setTicketLot(ticketLotArray);
    }
    reset();
    onRequestClose();
  };

  useEffect(() => {
    if (ticketLotFormMode === "Edit") {
      setValue("type", ticketLotEditedData!.type);
      setValue("qtdTotal", ticketLotEditedData!.qtdTotal);
      setValue("price", ticketLotEditedData!.price);
      format(new Date(ticketLotEditedData!.date!), "MM/dd/yyyy");
      setValue(
        "date",
        format(new Date(ticketLotEditedData!.date!), "yyyy-MM-dd")
      );
      setValue("qtdTotalPerUser", ticketLotEditedData!.qtdTotalPerUser);
    } else {
      reset();
    }
  }, [ticketLotFormMode, ticketLotEditedData, setValue, isOpen, reset]);

  useEffect(() => {
    isOpen &&
      document.documentElement.style.setProperty("--overflow", `hidden`);
    !isOpen && document.documentElement.style.setProperty("--overflow", `auto`);
  }, [isOpen]);

  return (
    <div className={`${styles["modal-wrapper"]}`}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          onRequestClose();
          reset();
        }}
        overlayClassName={`react-modal-overlay ${styles["modal-view"]}`}
        className={`react-modal-content w-100`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["content"]}>
            <button
              type="button"
              onClick={onRequestClose}
              className="react-modal-close"
            >
              <CgClose size={24} color="#1A2029" />
            </button>
            <div className={`${styles["form"]}`}>
              {ticketLotFormMode === "Create" ? (
                <h1 className={`${styles["heading"]}`}>
                  Criar ingresso <span>pago</span>
                </h1>
              ) : (
                <h1 className={`${styles["heading"]}`}>
                  Editar ingresso <span>pago</span>
                </h1>
              )}

              <div className={`${styles["row"]}`}>
                <Input
                  label="Título do ingresso"
                  requiredSymbol
                  margin="2rem 0 2rem"
                  placeholder="Ingresso unico, Meia entrada, VIP, etc."
                  {...register("type")}
                  errorMessage={errors?.type?.message}
                />

                <Input
                  label="Quantidade"
                  placeholder="Ex. 100"
                  requiredSymbol
                  margin="2rem 0 2rem"
                  {...register("qtdTotal")}
                  errorMessage={errors?.qtdTotal?.message}
                />

                <Input
                  label="Preço"
                  type="number"
                  placeholder="Ex. 100"
                  requiredSymbol
                  margin="2rem 0 2rem"
                  {...register("price")}
                  errorMessage={errors?.price?.message}
                />
                <div className={`${styles["total-buyer"]}`}>
                  <span>Total Comprador</span>
                  <span>Kz {totalBuyer ? totalBuyer : 0}</span>
                </div>
              </div>

              <div className={styles["row"]} style={{ margin: "2rem 0" }}>
                <Input
                  label="Data de Início"
                  requiredSymbol
                  type="date"
                  {...register("date")}
                  errorMessage={errors?.date?.message}
                />

                <Input
                  label="Máxima"
                  requiredSymbol
                  type="number"
                  placeholder="Número máxima"
                  {...register("qtdTotalPerUser")}
                  errorMessage={errors?.qtdTotalPerUser?.message}
                />
              </div>

              {/* <div className={`${styles["input-block"]}`}>
                <label className={`${styles["input-block-label"]}`}>
                  Descrição do ingresso (opcional):
                </label>

                <textarea
                  className={`${styles["input-description"]}`}
                  placeholder=""
                />
              </div> */}
            </div>
          </div>

          <div className={`${styles["footer"]}`}>
            <div className={`${styles["btn-group"]}`}>
              <button
                type="button"
                className={`${styles["btn"]} ${styles["btn-cancel"]}`}
                onClick={onRequestClose}
              >
                CANCELAR
              </button>
              <button
                type="submit"
                className={`${styles["btn"]} ${styles["btn-full"]}`}
              >
                {ticketLotFormMode === "Create" ? "CRIAR INGRESSO" : "SALVAR"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
