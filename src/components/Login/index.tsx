import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { useToasts } from "react-toast-notifications";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { loginSchema } from "../../validations/LoginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginDTO } from "../../dto/LoginDTO";
import VentusLogo from "../../assets/png/logo(4x).png";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Login() {
  const [loading, setLoading] = useState(false);

  const [inputPasswordType, setInputPasswordType] = useState("password");

  const { addToast } = useToasts();

  const router = useRouter();

  const { signIn, getLoginStatus } = useContext(AuthContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  function handleInputPasswordVisible() {
    setInputPasswordType("text");
  }

  function handleInputPasswordInvisible() {
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
      } else {
        addToast("Login Realizado com sucesso...", {
          appearance: "success",
          autoDismiss: true,
        });
      }

      router.push(`/`);
    } catch (error) {
      addToast("Erro ao criar a conta...", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <section className={styles["login"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>E-mail</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input
              type="text"
              className={styles.input}
              {...register("username")}
            />
            <span className={styles["error-label"]}>
              {errors.username?.message}
            </span>
          </div>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Senha</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <div className={styles["input-box"]}>
              <input
                type={inputPasswordType || ""}
                {...register("password")}
                className={styles.input}
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
            </div>
            <span className={styles["error-label"]}>
              {errors.password?.message}
            </span>
          </div>

          {/* <button className={styles["social-btn"]}>
            <FaFacebookF size={24} />
            Cadastrar com o Facebook
          </button> */}
          <button
            className={`${styles["btn"]} ${styles["btn-register"]}`}
            disabled={loading}
          >
            {loading ? <div className={styles["btn-loader"]} /> : "Entrar"}
          </button>

          <div className={styles["btn-group"]}>
            <Link href="/register">
              <a className={styles["link"]}>Não tenho conta</a>
            </Link>
            <Link href="/esqueci-senha" passHref>
              <a className={styles["link"]}>Esqueci minha senha</a>
            </Link>
          </div>

          <Link href="/">
            <a className={`${styles["link"]} ${styles["go-back"]}`}>
              Voltar na Home
            </a>
          </Link>
        </form>
      </div>
    </section>
  );
}
