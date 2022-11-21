import { useState, useEffect } from "react";
import Modal from "react-modal";
import { api } from "services/api";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CgClose } from "react-icons/cg";
import { Input } from "../Input";
import { Loading } from "components/Loading";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateTickeModal({ isOpen, onRequestClose }: Props) {
  return (
    <div className={`${styles["modal-wrapper"]}`}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName={`react-modal-overlay ${styles["modal-view"]}`}
        className={`react-modal-content w-100`}
      >
        <div className={styles["content"]}>
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
          >
            <CgClose size={24} color="#1A2029" />
          </button>
          <h1 className={`${styles["heading"]}`}>
            Criar ingresso <span>pago</span>
          </h1>

          <form className={`${styles["form"]}`}>
            <div className={`${styles["row"]}`}>
              <Input
                label="Título do ingresso"
                requiredSymbol
                margin="2rem 0 2rem"
                placeholder="Ingresso unico, Meia entrada, VIP, etc."
              />
              <Input
                label="Quantidade"
                placeholder="Ex. 100"
                requiredSymbol
                margin="2rem 0 2rem"
              />
              <Input
                label="Preço"
                type="number"
                placeholder="Ex. 100"
                requiredSymbol
                margin="2rem 0 2rem"
              />
              <div className={`${styles["total-buyer"]}`}>
                <span>Total Comprador</span>
                <span>Kz 0,00</span>
              </div>
            </div>

            <div className={`${styles["input-block"]}`}>
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
            </div>

            <div className={styles["row"]} style={{ margin: "2rem 0" }}>
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

            <div className={`${styles["input-block"]}`}>
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
            </div>

            <div className={`${styles["row"]}`} style={{ margin: "2rem 0" }}>
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
            </div>

            <div className={`${styles["input-block"]}`}>
              <label className={`${styles["input-block-label"]}`}>
                Descrição do ingresso (opcional):
              </label>

              <textarea
                className={`${styles["input-description"]}`}
                placeholder=""
              />
            </div>
          </form>
        </div>
        <div className={`${styles["footer"]}`}>
            <div className={`${styles["btn-group"]}`}>
                <button className={`${styles["btn"]} ${styles["btn-cancel"]}`}>
                    CANCELAR
                </button>
                <button className={`${styles["btn"]} ${styles["btn-full"]}`}>
                    CRIAR INGRESSO
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
}
