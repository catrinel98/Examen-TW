"use strict";

/*
 * Get unique error field name:
 */
const getUniqueErrorMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    output = `${fieldName} already exists`;
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

/*
 * Get error message from error object:
 */
const getErrorMessage = (err) => {
  let message = "Something went really wrong here!";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message === "Something went really wrong here!" ? err : message;
};

export default { getErrorMessage };
