import React, { useState, useEffect } from "react";
import Caseta from "./Caseta";
import { LOCALHOST, REMOTEHOST } from "../CONSTANTS";

const Tabel = ({ type }) => {
  const [data, setData] = useState();
  const URL =
    type === "articles" ? `${LOCALHOST.ARTICLES}` : `${LOCALHOST.REFERENCES}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [URL]);

  if (type === "articles")
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Nr. Crt.</th>
              <th>Titlu</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((article, index) => {
                return (
                  <tr key={index}>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td>{article.createdAt.substring(0, 10)}</td>
                    <td>
                      <a href={`/articles/${article.id}`}>
                        Vizualizare articol
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Caseta type={type} />
      </>
    );
  else if (type === "references")
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Nr. Crt.</th>
              <th>Titlu</th>
              <th>Autori</th>
              <th>Data</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((reference, index) => {
                return (
                  <tr key={index}>
                    <td>{reference.id}</td>
                    <td>{reference.title}</td>
                    <td>{reference.authors}</td>
                    <td>{reference.createdAt.substring(0, 10)}</td>
                    <td>
                      <a href={`/references/${reference.id}`}>
                        Vizualizare referinta {reference.id}
                      </a>
                    </td>
                    <td>
                      <a href={`/articles/${reference.articleID}`}>
                        Vizualizare articol citat
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Caseta type={type} />
      </>
    );
  else
    return (
      <div>
        <h1>Tabela solicitata nu exista</h1>
      </div>
    );
};

export default Tabel;
