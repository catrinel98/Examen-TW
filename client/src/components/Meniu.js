import React from "react";
import history from "../history";

const Meniu = () => {
  const handleClick = (type) => history.push(`/${type}`);

  return (
    <div className="container">
      <h1 className="app-title">EXAMEN REBECA TEHNOLOGII WEB 2022</h1>
      <button
        className="app-button-articles"
        onClick={() => handleClick("articles")}
      >
        CATRE TABELA DE ARTICOLE
      </button>
      <button
        className="app-button-references"
        onClick={() => handleClick("references")}
      >
        CATRE TABELA DE REFERINTE
      </button>
    </div>
  );
};

export default Meniu;
