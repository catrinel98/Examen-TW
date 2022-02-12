import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import history from "../history";
import { LOCALHOST, REMOTEHOST } from "../CONSTANTS";

const Reference = (props) => {
  const { id } = props.match.params || props.id;
  const URL = `${LOCALHOST.REFERENCES}/${id}`;
  const [isFound, setIsFound] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [authors, setAuthors] = useState("");

  const deleteReference = async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(URL, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.push("/references");
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Reference deleted succesfully!");
  };

  const editReference = () => {
    history.push(`/references/form/${id}`);
  };

  useEffect(() => {
    const fetchReference = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTitle(data.reference[0].title);
        setDate(data.reference[0].createdAt.substring(0, 10));
        setAuthors(data.reference[0].authors);
        setIsFound(true);
      } catch (error) {
        setIsFound(false);
        console.log(error);
      }
    };
    fetchReference(URL);
  }, [URL]);

  return (
    <div className="reference-card">
      <h2 className="reference-title">{title}</h2>
      <p className="reference-date">{date}</p>
      <p className="reference-authors">{authors}</p>
      <button className="reference-button-delete" onClick={deleteReference}>
        Sterge referinta
      </button>
      <button className="reference-button-edit" onClick={editReference}>
        Editeaza referinta
      </button>
    </div>
  );
};

export default withRouter(Reference);
