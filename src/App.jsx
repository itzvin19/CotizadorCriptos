import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.png";
import Resultado from "./components/Resultado";
import Formulario from "./components/Formulario";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [divisa, setDivisa] = useState({});
  const [resultado, setResultado] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(divisa).length > 0) {
      const cotizarCripto = async () => {
        setLoading(true);
        setResultado({});
        const { moneda, criptomoneda } = divisa;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const res = await fetch(url);
        const json = await res.json();
        setResultado(json.DISPLAY[criptomoneda][moneda]);
        setLoading(false);
      };
      cotizarCripto();
    }
  }, [divisa]);

  return (
    <>
      <Contenedor>
        <Imagen src={ImagenCripto} alt="ilustracion ciptomonedas" />
        <div>
          <Heading>Cotiza Criptos al Instante</Heading>
          <Formulario setDivisa={setDivisa} />
          {loading&&<Spinner></Spinner>}
          {resultado.PRICE && <Resultado resultado={resultado}></Resultado>}
        </div>
      </Contenedor>
    </>
  );
}

export default App;
