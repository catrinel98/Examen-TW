import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { LOCALHOST, REMOTEHOST } from "../CONSTANTS";

const FormularArticol = (props) => {
  const [data, setData] = useState({
    title: "",
    date: "",
    conclusion: "",
  });
  const [isFound, setIsFound] = useState(false);
  const id = props.id;
  const URL = `${LOCALHOST.ARTICLES}/${id}`;
  const fetchData = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      setData(data.article[0]);
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
        createdAt: data.date,
        conclusion: data.conclusion,
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
        createdAt: data.date,
        conclusion: data.conclusion,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <form
        className="formular"
        onSubmit={(event) => {
          event.preventDefault();
          isFound ? handlePUT() : handlePOST();
          props.history.push("/");
        }}
      >
        <div className="formular-item">
          <label htmlFor="title">Titlu articol</label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(event) =>
              setData({
                ...data,
                title: event.target.value,
              })
            }
          />
        </div>

        <div className="formular-item">
          <label htmlFor="date">Data articol</label>
          <input
            type="date"
            id="date"
            value={data.date}
            onChange={(event) =>
              setData({
                ...data,
                date: event.target.value,
              })
            }
          />
        </div>

        <div className="formular-item">
          <label htmlFor="conclusion">Concluzie (minim 10 caractere)</label>
          <textarea
            id="conclusion"
            value={data.conclusion}
            onChange={(event) =>
              setData({
                ...data,
                conclusion: event.target.value,
              })
            }
          />
        </div>
        <div className="formular-item">
          <button>{isFound ? "MODIFICA" : "ADAUGA"} ARTICOL</button>
        </div>
      </form>
      <button
        className="btn-back-form"
        onClick={() => {
          props.history.push("/articles");
        }}
      >
        INAPOI
      </button>
    </>
  );
};

export default withRouter(FormularArticol);
