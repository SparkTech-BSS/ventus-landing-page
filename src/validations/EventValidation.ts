import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  name: Yup.string().required("Nome do evento obrigatório"),
  location: Yup.string().required("Local do evento obrigatório"),
  category: Yup.string().required("Categoria do evento obrigatório"),
  startDate: Yup.date()
    .required("Campo é obrigatório")
    .typeError("Campo inválido")
    .test({
      name: "dateCompareIfLower",
      exclusive: false,
      params: {},
      message: "Um evento não pode ser publicado no passado",
      test: function (value: any) {
        return !(new Date(value) < new Date());
      },
    }),
  endDate: Yup.date()
    .required("campo é obrigatório")
    .typeError("Campo inválido")
    .test({
      name: "dataCompare",
      message: "Data de termino deve ser superior ou igual a data de início",
      test: function (value: any) {
        return new Date(value) >= new Date(this.parent.startDate);
      },
    }),
  startTime: Yup.string().required("Campo é obrigatório"),
  endTime: Yup.string()
    .required("Campo é obrigatórbio")
    .test({
      name: "max",
      message: "Hora de termino deve ser maior que a hora de inicio",
      test: function (value) {
        if (
          new Date(this.parent.endDate).getTime() ===
          new Date(this.parent.startDate).getTime()
        ) {
          return (
            Number(value?.split(":")[0]) >
            Number(this.parent.startTime?.split(":")[0])
          );
        }
        return true;
      },
    }),
  organizerName: Yup.string().required("Campo obrigatório"),
  acceptResponsibility: Yup.boolean()
    .required(
      "Para continuar é necessário aceitar todos os termos e políticas."
    )
    .oneOf(
      [true],
      "Para continuar é necessário aceitar todos os termos e políticas."
    ),
  isPublic: Yup.boolean().required("Campo obrigatório"),
});

//yup.bool().oneOf([true], 'Para continuar é necessário aceitar todos os termos e políticas.')
