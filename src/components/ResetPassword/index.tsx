import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDTO } from "../../dto/UserDTO";
import { api } from "services/api";
import { useToasts } from "react-toast-notifications";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPasswordSchema } from "validations/ResetPasswordValidation";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import VentusLogo from "../../assets/png/logo(4x).png";
import styles from "./styles.module.scss";
import { ServerError } from "components/ServerError";

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [inputConfirmPasswordType, setInputConfirmPasswordType] =
    useState("password");
  const router = useRouter();
  const { id } = router.query;
  const { addToast } = useToasts();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
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
      const response = await api.put("/users/updatepassword", {
        email: email,
        password: data.password,
      });

      router.push(`/login`);

      addToast("Senha ressetada com sucesso", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("Houve um erro ao ressetar a senha", {
        appearance: "error",
        autoDismiss: true,
      });

      console.log(error);

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async function fetchData() {
      try {
        const response = await api.get(`reset-password/${id}`);

        if (response.data?.uuid) {
          setIsChanged(true);
        }

        setEmail(response.data?.email);
        setUuid(response.data?.uuid);
      } catch (error) {
        setError(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id, addToast, router]);

  useEffect(() => {
    if (isChanged) {
      if (!uuid) {
        addToast(
          "O link expirou, por favor tente ressetar a senha novamente.",
          {
            appearance: "info",
            autoDismiss: false,
          }
        );

        router.push(`/`);
      }
    }
  }, [isChanged, uuid, addToast, router]);

  if (error) {
    return <ServerError />;
  }

  return (
    <section className={styles["reset-password"]}>
      <div className={styles["container"]}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        <p className={styles.text}>
          Para iniciar o processo de redefinição da senha, preencha o campo
          abaixo com a nova senha.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Nova Senha</label>
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
              <label>Confirmar Senha Nova</label>
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
            className={`${styles["btn"]} ${styles["btn-register"]}`}
            disabled={loading}
          >
            {loading ? <div className={styles["btn-loader"]} /> : "Salvar"}
          </button>
          <Link href="/login" passHref>
            <a className={styles.link}>Voltar para o login</a>
          </Link>
        </form>
      </div>
    </section>
  );
}
