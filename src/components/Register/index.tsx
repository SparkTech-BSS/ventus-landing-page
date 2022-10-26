import { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDTO } from "../../dto/UserDTO";
import { LoginDTO } from "../../dto/LoginDTO";
import { api } from "services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import VentusLogo from "../../assets/png/logo(4x).png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Loading } from "components/Loading";
import { checkInRegistrationProcessIfValueExist } from "utils";

export function Register() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [inputConfirmPasswordType, setInputConfirmPasswordType] =
    useState("password");
  const { addToast } = useToasts();

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      try {
        const { data } = await api.get(`users/findall`);
        setUserData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);


  const userSchema = Yup.object().shape({
    firstName: Yup.string().required("Primeiro nome é obrigatório"),
    lastName: Yup.string().required("Último nome é obrigatório"),
    email: Yup.string()
      .required("Email é obrigatório")
      .email("Email inválido")
      .test(
        "emailExist",
        "Este E-mail já foi usado",
        (value: any) =>
          !checkInRegistrationProcessIfValueExist(value, "email", userData)
      ),
    phone: Yup.number()
      .required("Telefone obrigatório")
      .test(
        "phoneExist",
        "Este Número de telefone já foi usado",
        (value: any) =>
          !checkInRegistrationProcessIfValueExist(
            `+244${value}`,
            "phone",
            userData
          )
      )
      .typeError("Telefone inválido"),
    password: Yup.string()
      .required("Nenhuma senha fornecida.")
      .min(8, "A senha é muito curta - deve ter no mínimo 8 caracteres.")
      .matches(
        /[a-zA-Z]/,
        "A senha deve contar com letras maiúsculas e minúsculas."
      ),
    passwordConfirmation: Yup.string()
      .required("Confirmar senha é necessária")
      .oneOf(
        [Yup.ref("password")],
        "A Senha deve corresponder a confirmar senha"
      ),
  });

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

      const singInData: LoginDTO = {
        username: data.email!,
        password: data.password!,
      };

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

        {loading && (
          <div className={styles["loading-wrapper"]}>
            <Loading />
          </div>
        )}

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
