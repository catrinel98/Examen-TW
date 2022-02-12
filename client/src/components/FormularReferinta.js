import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { LOCALHOST, REMOTEHOST } from "../CONSTANTS";

const FormularReferinta = (props) => {
  const [data, setData] = useState({
    title: "",
    authors: "",
    date: "",
    articleID: "",
  });
  const [isFound, setIsFound] = useState(false);
  const id = props.id;

  const URL = `${LOCALHOST.REFERENCES}/${id}`;

  const fetchData = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      setData(data.reference[0]);
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handlePOST = async () => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: data.title,
        authors: data.authors,
        createdAt: data.date,
        articleID: data.articleID,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  const handlePUT = async () => {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: data.title,
        authors: data.authors,
        createdAt: data.date,
        articleID: data.articleID,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <form
        className="formular"
        onSubmit={(e) => {
          e.preventDefault();
          isFound ? handlePUT() : handlePOST();
          props.history.push("/");
        }}
      >
        <div className="formular-item">
          <label htmlFor="title">Titlu referinta</label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(event) => {
              setData({
                ...data,
                title: event.target.value,
              });
            }}
          />
        </div>
        <div className="formular-item">
          <label htmlFor="authors">Autori (despartiti prin virgula)</label>
          <input
            type="text"
            id="authors"
            value={data.authors}
            onChange={(event) => {
              setData({
                ...data,
                authors: event.target.value,
              });
            }}
          />
        </div>
        <div className="formular-item">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            value={data.date}
            onChange={(event) => {
              setData({
                ...data,
                date: event.target.value,
              });
            }}
          />
        </div>
        <div className="formular-item">
          <label htmlFor="Asociere">Asociere cu un articol prin ID</label>
          <input
            type="number"
            id="Asociere"
            value={data.articleID !== undefined ? data.articleID : 1}
            onChange={(event) => {
              setData({
                ...data,
                articleID: event.target.value,
              });
            }}
          />
        </div>

        <div className="formular-item">
          <button>{isFound ? "MODIFICA" : "ADAUGA"} REFERINTA</button>
        </div>
      </form>
      <button
        className="btn-back-form"
        onClick={() => {
          props.history.push("/references");
        }}
      >
        INAPOI
      </button>
    </>
  );
};

export default withRouter(FormularReferinta);
