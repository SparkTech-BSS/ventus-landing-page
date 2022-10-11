import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Email é obrigatório").email("Email inválido"),
  password: Yup.string().required("Senha é obrigatório"),
});
