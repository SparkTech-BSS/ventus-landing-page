import { useState, useEffect, Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CgClose } from "react-icons/cg";
import { api } from "services/api";
import { Input } from "../Input";
import { TicketLotDTO } from "dto/TicketLotDTO";
import { Loading } from "components/Loading";
import { RATE_PRICE } from "config";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  ticketLotFormMode: "Create" | "Edit";
  setTicketLot: Dispatch<SetStateAction<TicketLotDTO[]>>;
  ticketLotEditedData?: TicketLotDTO;
  ticketLot: TicketLotDTO[];
}

export function CreateTicketLotModal({
  isOpen,
  onRequestClose,
  ticketLotFormMode,
  setTicketLot,
  ticketLotEditedData,
  ticketLot,
}: Props) {
  const ticketLotSchema = Yup.object().shape({
    type: Yup.string().required("Título obrigatório"),
    startDate: Yup.date()
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
      }),
    endDate: Yup.date()
      .required("campo é obrigatório")
      .typeError("Campo inválido")
      .test({
        name: "dataCompare",
        message: "Data de termino deve ser superior ou igual a data de início",
        test: function (value: any) {
          return new Date(value) >= new Date(this.parent.startDate);
        },
      }),
    startTime: Yup.string().required("Campo é obrigatório"),
    endTime: Yup.string()
      .required("Campo é obrigatórbio")
      .test({
        name: "max",
        message: "Hora de termino deve ser maior que a hora de inicio",
        test: function (value) {
          if (
            new Date(this.parent.endDate).getTime() ===
            new Date(this.parent.startDate).getTime()
          ) {
            return (
              Number(value?.split(":")[0]) >
              Number(this.parent.startTime?.split(":")[0])
            );
          }
          return true;
        },
      }),
    price: Yup.number()
      .required("Preço obrigatório")
      .typeError("Campo inválido"),
    qtdTotal: Yup.number()
      .required("Quantidade total obrigatório")
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
        id: uuidv4(),
        date: data?.startDate,
        ...data,
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
        id: ticketLotEditedData?.id,
        date: ticketLotEditedData?.startDate,
        ...data,
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
      setValue("startDate", String(ticketLotEditedData!.startDate));
      setValue("endDate", String(ticketLotEditedData!.endDate));
      // setValue("startDate", new Date(String(ticketLotEditedData!.startDate)));
      // setValue("endDate", new Date(String(ticketLotEditedData!.endDate)));
      setValue("startTime", ticketLotEditedData!.startTime);
      setValue("endTime", ticketLotEditedData!.endTime);
    } else {
      reset();
    }
  }, [ticketLotFormMode, ticketLotEditedData, setValue, isOpen, reset]);

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

              {/* <div className={`${styles["input-block"]}`}>
                <div className={`${styles["input-block-label-wrapper"]}`}>
                  <label>Período das vendas deste ingresso</label>
                  <span>*</span>
                </div>
                <RadioGroup.Root
                  className={styles["RadioGroupRoot"]}
                  defaultValue="default"
                  aria-label="View density"
                >
                  <div className={styles["RadioGroupRoot-Wrapper"]}>
                    <div className={styles["RadioGroupRoot-Wrapper__item"]}>
                      <RadioGroup.Item
                        className={styles["RadioGroupItem"]}
                        value="default"
                        id="r1"
                      >
                        <RadioGroup.Indicator
                          className={styles["RadioGroupIndicator"]}
                        />
                      </RadioGroup.Item>
                      <label className={styles["Label"]} htmlFor="r1">
                        Por data
                      </label>
                    </div>

                    <div className={styles["RadioGroupRoot-Wrapper__item"]}>
                      <RadioGroup.Item
                        className={styles["RadioGroupItem"]}
                        value="comfortable"
                        id="r2"
                      >
                        <RadioGroup.Indicator
                          className={styles["RadioGroupIndicator"]}
                        />
                      </RadioGroup.Item>
                      <label className={styles["Label"]} htmlFor="r2">
                        Por lote
                      </label>
                    </div>
                  </div>
                </RadioGroup.Root>
              </div> */}

              <div className={styles["row"]} style={{ margin: "2rem 0" }}>
                <Input
                  label="Data de Início"
                  requiredSymbol
                  type="date"
                  {...register("startDate")}
                  errorMessage={errors?.startDate?.message}
                />

                <Input
                  label="Hora de Início"
                  requiredSymbol
                  type="time"
                  {...register("startTime")}
                  errorMessage={errors?.startTime?.message}
                />

                <Input
                  label="Data de Término "
                  requiredSymbol
                  type="date"
                  {...register("endDate")}
                  errorMessage={errors?.endDate?.message}
                />

                <Input
                  label="Hora de Término"
                  requiredSymbol
                  type="time"
                  {...register("endTime")}
                  errorMessage={errors?.endTime?.message}
                />
              </div>

              {/* <div className={`${styles["input-block"]}`}>
                <div className={`${styles["input-block-label-wrapper"]}`}>
                  <label>Disponibilidade do Ingresso:</label>
                  <span>*</span>
                </div>

                <RadioGroup.Root
                  className={styles["RadioGroupRoot"]}
                  defaultValue="default"
                  aria-label="View density"
                >
                  <div className={styles["RadioGroupRoot-Wrapper-col"]}>
                    <div className={styles["RadioGroupRoot-Wrapper__item"]}>
                      <RadioGroup.Item
                        className={styles["RadioGroupItem"]}
                        value="default"
                        id="d1"
                      >
                        <RadioGroup.Indicator
                          className={styles["RadioGroupIndicator"]}
                        />
                      </RadioGroup.Item>
                      <label className={styles["Label"]} htmlFor="d1">
                        Para todo o público
                      </label>
                    </div>

                    <div className={styles["RadioGroupRoot-Wrapper__item"]}>
                      <RadioGroup.Item
                        className={styles["RadioGroupItem"]}
                        value="comfortable"
                        id="d2"
                      >
                        <RadioGroup.Indicator
                          className={styles["RadioGroupIndicator"]}
                        />
                      </RadioGroup.Item>
                      <label className={styles["Label"]} htmlFor="d2">
                        Restrito a convidados
                      </label>
                    </div>

                    <div className={styles["RadioGroupRoot-Wrapper__item"]}>
                      <RadioGroup.Item
                        className={styles["RadioGroupItem"]}
                        value="manuel"
                        id="d3"
                      >
                        <RadioGroup.Indicator
                          className={styles["RadioGroupIndicator"]}
                        />
                      </RadioGroup.Item>
                      <label className={styles["Label"]} htmlFor="d3">
                        Adicionar manualmente
                      </label>
                    </div>
                  </div>
                </RadioGroup.Root>
              </div> */}

              {/* <div className={`${styles["row"]}`} style={{ margin: "2rem 0" }}>
                <div className={`${styles["input-block"]}`}>
                  <div className={`${styles["input-block-label-wrapper"]}`}>
                    <label>Disponibilidade do Ingresso:</label>
                  </div>

                  <div className={`${styles["row"]}`}>
                    <Input
                      label="Mínima"
                      requiredSymbol
                      placeholder="Nome do evento"
                    />
                    <Input
                      label="Máxima"
                      requiredSymbol
                      placeholder="Nome do evento"
                    />
                  </div>
                </div>
              </div> */}

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
