import { useRef, useState } from "react";
import Modal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDTO } from "../../dto/UserDTO";
import { api } from "services/api";
import { userSchema } from "../../validations/UserValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { CgClose } from "react-icons/cg";
import { BsEnvelope } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { IoReturnUpBackOutline, IoCheckboxOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineContacts, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FiUser, FiPhone } from "react-icons/fi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function RegisterModal({ isOpen, onRequestClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [inputConfirmPasswordType, setInputConfirmPasswordType] =
    useState("password");
  const progressBarPasswordStrengthRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  const [currentProgressBarType, setCurrentProgressBarType] = useState("");
  const [isActiveLowUpperCaseRule, setIsActivLowUpperCaseRule] =
    useState(false);
  const { addToast } = useToasts();
  const [isActiveNumberRule, setIsActiveNumberRule] = useState(false);
  const [isSpecialCharRule, SetIsSpecialCharRule] = useState(false);
  const [isEightCharRule, setIsEightCharRule] = useState(false);
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(userSchema),
  });

  function handleInputPasswordVisible() {
    setInputPasswordType("text");
  }

  function handleInputPasswordInvisible() {
    setInputPasswordType("password");
  }

  function handleInputConfirmPasswordVisible() {
    console.log(inputConfirmPasswordType);
    setInputConfirmPasswordType("text");
  }

  function handleInputConfirmPasswordInvisible() {
    setInputConfirmPasswordType("password");
  }

  // function checkStrength(e: React.ChangeEvent<HTMLInputElement>) {
  //   let strength = 0;

  //   if (e.target.value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
  //     strength += 1;
  //     setIsActivLowUpperCaseRule(true);
  //   } else {
  //     setIsActivLowUpperCaseRule(false);
  //   }

  //   if (e.target.value.match(/([0-9])/)) {
  //     strength += 1;
  //     setIsActiveNumberRule(true);
  //   } else {
  //     setIsActiveNumberRule(false);
  //   }

  //   if (e.target.value.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
  //     strength += 1;
  //     SetIsSpecialCharRule(true);
  //   } else {
  //     SetIsSpecialCharRule(false);
  //   }

  //   if (e.target.value.length > 7) {
  //     strength += 1;
  //     setIsEightCharRule(true);
  //   } else {
  //     setIsEightCharRule(false);
  //   }

  //   if (strength < 2) {
  //     progressBarPasswordStrengthRef.current.style.width = "10%";
  //   } else if (strength === 3) {
  //     progressBarPasswordStrengthRef.current.style.width = "60%";
  //   } else if (strength === 4) {
  //     progressBarPasswordStrengthRef.current.style.width = "100%";
  //   }

  //   setProgressBarWidth(strength);
  // }

  function setProgressBarWidth(passwordStrengthValue: number) {
    if (passwordStrengthValue < 2) {
      setCurrentProgressBarType("progress-bar-danger");
    } else if (passwordStrengthValue === 3) {
      setCurrentProgressBarType("progress-bar-warning");
    } else if (passwordStrengthValue === 4) {
      setCurrentProgressBarType("progress-bar-success");
    }
  }

  const onSubmit: SubmitHandler<UserDTO> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await api.post("users", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phone: String(data.phone),
      });

      console.log(response);

      addToast("Conta criada com sucesso...", {
        appearance: "success",
        autoDismiss: true,
      });

      onRequestClose();
      reset();

    } catch (error) {
      addToast("Credenciais inválidas...", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <CgClose size={24} color="#1A2029" />
      </button>

      <div className={styles["content"]}>
        <h1 className={styles.heading}>Criar Conta</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <FiUser size={18} color="#888" />
            </span>
            <input
              type="text"
              className={styles.input}
              placeholder="Primeiro nome"
              {...register("firstName")}
            />
            <span className={styles["error-message"]}>
              {errors.firstName?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <MdOutlineContacts size={18} color="#888" />
            </span>
            <input
              type="text"
              className={styles.input}
              placeholder="Sobre nome"
              {...register("lastName")}
            />
            <span className={styles["error-message"]}>
              {errors.lastName?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <BsEnvelope size={18} color="#888" />
            </span>
            <input
              type="text"
              className={styles.input}
              placeholder="Seu email"
              {...register("email")}
            />
            <span className={styles["error-message"]}>
              {errors.email?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <FiPhone size={18} color="#888" />
            </span>
            <input
              type="number"
              className={styles.input}
              placeholder="Contacto"
              {...register("phone")}
            />
            <span className={styles["error-message"]}>
              {errors.phone?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <CgLock size={18} color="#888" />
            </span>
            <input
              type={inputPasswordType || ""}
              className={styles.input}
              placeholder="Senha"
              {...register("password")}
              // onChange={checkStrength}
            />
            <div className={styles["password-icon"]}>
              {inputPasswordType === "password" ? (
                <AiFillEye
                  size="20"
                  color="#888"
                  onClick={handleInputPasswordVisible}
                />
              ) : (
                <AiFillEyeInvisible
                  size="20"
                  color="#888"
                  onClick={handleInputPasswordInvisible}
                />
              )}
            </div>
            <span className={styles["error-message"]}>
              {errors.password?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <CgLock size={18} color="#888" />
            </span>
            <input
              type={inputConfirmPasswordType || ""}
              className={styles.input}
              placeholder="Confirmar Senha"
              {...register("passwordConfirmation")}
            />
            <div className={styles["password-icon"]}>
              {inputConfirmPasswordType === "password" ? (
                <AiFillEye
                  size="20"
                  color="#888"
                  onClick={handleInputConfirmPasswordVisible}
                />
              ) : (
                <AiFillEyeInvisible
                  size="20"
                  color="#888"
                  onClick={handleInputConfirmPasswordInvisible}
                />
              )}
            </div>
            <span className={styles["error-message"]}>
              {errors.passwordConfirmation?.message}
            </span>
          </div>

          {/* <div className={styles["progress-bar-width"]}>
            <div
              className={`${styles["progress-bar"]} ${styles[currentProgressBarType]}`}
              ref={progressBarPasswordStrengthRef}
            />
          </div> */}

          {/* <ul className={styles["list-password-checked-requisite"]}>
            <li>
              {isActiveLowUpperCaseRule ? (
                <IoCheckboxOutline color="#67C859" size={15} />
              ) : (
                <MdCheckBoxOutlineBlank size={15} />
              )}
              Minúsculas e Maiúsculas
            </li>
            <li>
              {isActiveNumberRule ? (
                <IoCheckboxOutline color="#67C859" size={15} />
              ) : (
                <MdCheckBoxOutlineBlank size={15} />
              )}
              Número (0-9)
            </li>
            <li>
              {isSpecialCharRule ? (
                <IoCheckboxOutline color="#67C859" size={15} />
              ) : (
                <MdCheckBoxOutlineBlank size={15} />
              )}
              Caractere especial (!@#$%^{"&"}*)
            </li>
            <li>
              {isEightCharRule ? (
                <IoCheckboxOutline color="#67C859" size={15} />
              ) : (
                <MdCheckBoxOutlineBlank size={15} />
              )}
              Pelo menos 8 caracteres
            </li>
          </ul> */}

          <button className={styles.btn} type="submit">
            {loading ? <div className={styles["btn-loader"]} /> : "Criar Conta"}
          </button>
          {/* <button className={styles["social-btn"]}>
            <FaFacebookF size={24} />
            Entrar com o Facebook
          </button> */}

          <div className={styles["term-use"]}>
            <p className={styles.text}>
              Ao clicar no botão abaixo, você declara concordar com nossos{" "}
              <a className={styles.link}>Termos de Serviço</a>
            </p>
          </div>
        </form>
      </div>
      <div className={styles["register-box"]}>
        <span>
          Já possui uma conta?{" "}
          <a className={styles.link} href="#">
            Faça login!
          </a>
        </span>
      </div>
    </Modal>
  );
}
