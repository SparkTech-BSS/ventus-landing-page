import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDTO } from "../../dto/UserDTO";
import { LoginDTO } from "../../dto/LoginDTO";
import { api } from "services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { userSchema } from "../../validations/UserValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import VentusLogo from "../../assets/png/logo(4x).png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Register() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [inputConfirmPasswordType, setInputConfirmPasswordType] =
    useState("password");
  const { addToast } = useToasts();
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
    setInputConfirmPasswordType("text");
  }

  function handleInputConfirmPasswordInvisible() {
    setInputConfirmPasswordType("password");
  }

  const onSubmit: SubmitHandler<UserDTO> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("users", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phone: String(data.phone),
      });

      addToast("Conta criada com sucesso...", {
        appearance: "success",
        autoDismiss: true,
      });

      const singInData: LoginDTO  = {
        username: data.email!,
        password: data.password!
      }

      await signIn(singInData);

      router.push(`/`);

      reset();
    } catch (error) {
      addToast("Erro ao criar a conta...", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={styles["register"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        {/* <button className={styles["social-btn"]}>
          <FaFacebookF size={24} />
          Cadastrar com o Facebook
        </button> */}

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Nome</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input
              type="text"
              className={styles.input}
              {...register("firstName")}
            />
            <span className={styles["error-label"]}>
              {errors?.firstName?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Sobrenome</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input
              type="text"
              className={styles.input}
              {...register("lastName")}
            />
            <span className={styles["error-label"]}>
              {errors?.lastName?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>E-mail</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input
              type="text"
              className={styles.input}
              {...register("email")}
            />
            <span className={styles["error-label"]}>
              {errors?.email?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Telefone</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input
              type="number"
              className={styles.input}
              {...register("phone")}
            />
            <span className={styles["error-label"]}>
              {errors?.phone?.message}
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
              {errors?.password?.message}
            </span>
          </div>

          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Confirmar Senha</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <div className={styles["input-box"]}>
              <input
                type={inputConfirmPasswordType || ""}
                {...register("passwordConfirmation")}
                className={styles.input}
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
            </div>
            <span className={styles["error-label"]}>
              {errors?.passwordConfirmation?.message}
            </span>
          </div>
          
          <button
            type="submit"
            className={`${styles["btn"]} ${styles["btn-register"]}`}
            disabled={loading}
          >
            {loading ? <div className={styles["btn-loader"]} /> : "CRIAR CONTA"}
          </button>
          <Link href="/login" passHref>
            <a className={styles["btn-link"]}>Já sou cadastrado</a>
          </Link>

          <p className={styles.text}>
            Ao clicar no botão abaixo, você declara concordar com nossos{" "}
            <a className={styles.link}>Termos de Serviço</a>
          </p>
        </form>
      </div>
    </section>
  );
}
