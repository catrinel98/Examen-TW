import React from "react";
import { withRouter } from "react-router-dom";

import FormularArticol from "./FormularArticol";
import FormularReferinta from "./FormularReferinta";

const Formular = (props) => {
  const { type, location } = props;
  const { pathname } = location;
  const id = pathname.split("/")[3];

  if (type === "articles") {
    return id !== undefined ? <FormularArticol id={id} /> : <FormularArticol />;
  } else if (type === "references") {
    return id !== undefined ? <FormularReferinta id={id} /> : <FormularReferinta />;
  }
};

export default withRouter(Formular);
