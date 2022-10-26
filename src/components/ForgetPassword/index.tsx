import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { userSchema } from "../../validations/UserValidation";
import { UserDTO } from "../../dto/UserDTO";
import * as Yup from "yup";
import { api } from "services/api";
import VentusLogo from "../../assets/png/logo(4x).png";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";



export function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const router = useRouter();

  const emailSchema = Yup.object().shape({
    email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDTO>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(emailSchema),
  });

  const onSubmit: SubmitHandler<UserDTO> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/reset-password/sendmail", {
        email: data.email,
      });

      router.push(`/confirm-email`);
    } catch (error) {
      addToast("Erro ao enviar o e-mail...", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles["forget-password"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        <p className={styles.text}>
          Para iniciar o processo de criação de uma nova senha, preencha o campo
          abaixo com o e-mail associado à sua conta Ventus.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              {errors.email?.message}
            </span>
          </div>

          <button
            type="submit"
            className={`${styles["btn"]} ${styles["btn-register"]}`}
            disabled={loading}
          >
            {loading ? <div className={styles["btn-loader"]} /> : "Enviar"}
          </button>

          <Link href="/login" passHref>
            <a className={styles.link}>Voltar para o login</a>
          </Link>
        </form>
      </div>
    </section>
  );
}
