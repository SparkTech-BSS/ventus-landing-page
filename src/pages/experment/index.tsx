import { Button } from "components/Experment/Experment1/Button";

import  {Container}  from "components/Experment/Experment2/Container";

import Layout from "components/Layout";
import { Artigos } from "components/Experment/Experment2/Artigos";


export default function Experment() {
  return (
    <>
      <Layout>
        
          <h1>Welcome To Jomanji!</h1>
          <Button
            border="btn-border-solid-primary"
            backgroundColors="btn-default-bg"
            color="btn-color-default"
            fontWeight="btn-fontWeight-600"
            fontSize="btn-size-12"
            textContent="Publicar Evento"
          />
          <Artigos 
            
          />

      </Layout>
    </>
  );
}
