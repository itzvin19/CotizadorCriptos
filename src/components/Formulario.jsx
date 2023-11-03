import React from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/moneda";
import Error from "./Error";
import { useEffect, useState } from "react";
const Formulario = ({setDivisa}) => {
  const [criptos, setCriptos] = useState([]);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu Criptomoneda",
    criptos
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      const call = await fetch(
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      );
      const res = await call.json();
      const arrayCriptos = res.Data.map((cripto) => {
        const object = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return object;
      });
      setCriptos(arrayCriptos);
    };
    callApi();
  }, []);

  const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 5px;
    margin-top: 30px;

    &:hover {
      background: #7a7dfe;
    }
  `;

  const handleSubmit = () => {
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setDivisa({
        moneda,
        criptomoneda
    })
  };

  return (
    <>
      {error && <Error>Debe de Seleccionar ambas monedas</Error>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <SelectMonedas></SelectMonedas>
        <SelectCriptomoneda></SelectCriptomoneda>
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};
export default Formulario;
