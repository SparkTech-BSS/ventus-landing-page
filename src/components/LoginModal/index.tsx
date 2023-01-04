import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import Link from "next/link";
import Router from "next/router";
import { FiAlertCircle } from "react-icons/fi";
import { useToasts } from "react-toast-notifications";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginDTO } from "../../dto/LoginDTO";
import { loginSchema } from "../../validations/LoginValidation";
import { CgClose } from "react-icons/cg";
import { BsEnvelope } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function LoginModal({ isOpen, onRequestClose }: Props) {
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { signIn, getLoginStatus, openLoginModal, setOpenLoginModal } =
    useContext(AuthContext);

  function handleInputPasswordVisible() {
    setInputPasswordType("text");
  }

  function handleInputPassowrdInvisible() {
    setInputPasswordType("password");
  }

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setLoading(true);
    try {
      await signIn(data);

      if (getLoginStatus() == 401) {
        addToast("Credenciais inválidas...", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      // addToast("Login Realizado com sucesso...", {
      //   appearance: "success",
      //   autoDismiss: true,
      // });

      // Router.reload();
    } catch (error) {
      addToast("Credenciais inválidas...", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      reset();
      onRequestClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    isOpen && document.documentElement.style.setProperty("--overflow", `hidden`);
    !isOpen && document.documentElement.style.setProperty("--overflow", `auto`);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen || openLoginModal}
      onRequestClose={() => {
        onRequestClose();
        setOpenLoginModal(false);
        reset();
      }}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <button
        type="button"
        onClick={() => {
          onRequestClose();
          setOpenLoginModal(false);
          reset();
        }}
        className="react-modal-close"
      >
        <CgClose size={24} color="#1A2029" />
      </button>

      <div className={styles["content"]}>
        <h1 className={styles.heading}>Login</h1>

        {openLoginModal && (
          <div className={styles["info"]}>
            <FiAlertCircle size={24} color="#FF5555" />
            <p className={styles.text}>
              Precisa estar logado para fazer a compra.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-group"]}>
            <span className={styles["input-group-icon"]}>
              <BsEnvelope size={18} color="#888" />
            </span>
            <input
              type="text"
              className={styles.input}
              placeholder="E-mail"
              {...register("username")}
            />
            <span className={styles["error-message"]}>
              {errors.username?.message}
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
                  onClick={handleInputPassowrdInvisible}
                />
              )}
            </div>
            <span className={styles["error-message"]}>
              {errors.password?.message}
            </span>
          </div>

          <button className={styles.btn} disabled={loading} type="submit">
            {loading ? <div className={styles["btn-loader"]} /> : "Entrar"}
          </button>

          {/* <button className={styles["social-btn"]} type="button">
            <FaFacebookF size={24} />
            Cadastrar com o Facebook
          </button> */}

          <div className={styles["forget-password"]}>
            <span> Esqueceu sua senha?</span>
            <Link href="/esqueci-senha" passHref>
              <a className={styles["link"]} href="#">
                Clique aqui
              </a>
            </Link>
          </div>
        </form>
      </div>
      <div className={styles["register-box"]}>
        <span>
          Não possui uma conta?{" "}
          <Link href="/register" passHref>
            <a className={styles.link}>
              Cadastre-se!
            </a>
          </Link>
        </span>
      </div>
    </Modal>
  );
}
