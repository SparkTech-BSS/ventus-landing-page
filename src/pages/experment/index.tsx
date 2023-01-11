import { Button } from "components/Experment/Experment1/Button";
import Layout from "components/Layout";
import { ButtonGeneric } from "components/Experment/Experment2/Button";

export default function Experment() {
  return (
    <>
      <Layout>
        <h1>Welcome To Jomanji!</h1>

        <Button
          backgroundColors="btn-primary-bg"
          borderRadius="btn-primary-borderRadius"
          fontSize="btn-size-12"
          fontWeight="btn-fontWeight-700"
          color="btn-color-primary"
          textContent="Comprar Ingresso"
        />

        <Button
          backgroundColors="btn-gradient-bg"
          borderRadius="btn-secondary-borderRadius"
          fontSize="btn-size-13"
          fontWeight="btn-fontWeight-900"
          onClick={() => {
            alert("Estamos aqui!");
          }}
          color="btn-color-secondary"
          textContent="Fale Conosco"
        />

        <Button />

        <Button
          border="btn-border-solid-primary"
          backgroundColors="btn-default-bg"
          color="btn-color-default"
          fontWeight="btn-fontWeight-600"
          fontSize="btn-size-12"
          textContent="Publicar Evento"
        />
      </Layout>
    </>
  );
}
