import React, { useState, useEffect } from "react";
import history from "../history";
import { LOCALHOST, REMOTEHOST } from "../CONSTANTS";

const Caseta = ({ type }) => {
  const [lastEntry, setLastEntry] = useState(-1);
  const handleClick = (type) => history.push(`/${type}/form/${lastEntry + 1}`);
  const cuvant = type === "articles" ? "articol" : "referinta";

  useEffect(() => {
    const fetchLastEntry = async (type) => {
      try {
        const response = await fetch(`${LOCALHOST.GENERAL}${type}`);
        const data = await response.json();
        setLastEntry(data[data.length - 1].id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLastEntry(type);
  }, [type]);

  return (
    <div className="caseta">
      <button className="caseta-button-add" onClick={() => handleClick(type)}>
        Adauga {cuvant.toUpperCase()}
      </button>
      <button className="caseta-button-back" onClick={() => history.push("/")}>
        Mergi la meniul principal
      </button>
    </div>
  );
};

export default Caseta;
