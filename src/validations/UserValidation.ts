import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Primeiro nome é obrigatório"),
  lastName: Yup.string().required("Último nome é obrigatório"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: Yup.number()
    .required("Telefone obrigatório")
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
