import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import history from "../history";
import { LOCALHOST, REMOTEHOST } from "../CONSTANTS";

const Article = (props) => {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const URL = `${LOCALHOST.ARTICLES}/${id}`;

  const [isFound, setIsFound] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [nrCrt, setNrCrt] = useState("");

  const deleteArticle = async () => {
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
        history.push("/articles");
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Article deleted succesfully!");
  };

  const editArticle = () => {
    history.push(`/articles/form/${id}`);
  };

  useEffect(() => {
    const fetchArticle = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTitle(data.article[0].title);
        setDate(data.article[0].createdAt.substring(0, 10));
        setNrCrt(data.article[0].id);
        setConclusion(data.article[0].conclusion);
        setIsFound(true);
      } catch (error) {
        setIsFound(false);
        console.log(error);
      }
    };
    fetchArticle(URL);
  }, [URL]);

  return (
    <div className="article-card">
      <h1 className="article-title">{title}</h1>
      <span className="article-date">{date}</span>
      <p className="article-conclusion">{conclusion}</p>
      <button className="article-delete" onClick={() => deleteArticle()}>
        Sterge articol
      </button>
      <button className="article-edit" onClick={() => editArticle()}>
        Editeaza articol
      </button>
    </div>
  );
};

export default withRouter(Article);
