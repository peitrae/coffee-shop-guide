import React from "react";

import "./ErrorMessage.scss";

const ErrorMessage = ({children, className}) => {
  const checkErrorMessage = message => {
    switch (message) {
      case "INVALID_EMAIL":
        return "Invalid Email";
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        return "Password should be at least 6 characters";
      case "INVALID_PASSWORD":
        return "Invalid Password";
      case "MISSING_PASSWORD":
        return "Password is empty";
      case "EMAIL_NOT_FOUND":
        return "Email not found";
      case "EMAIL_EXISTS":
        return "The email address is already in use by another account";
      case "PASSWORD_NOT_MATCH":
        return "Password not match"
      case "CREDENTIAL_TOO_OLD_LOGIN_AGAIN":
        return "Please login again"
      default:
        return message;
    }
  };

  return <div className={`error-message ${className}`}>{checkErrorMessage(children)}</div>;
};

export default ErrorMessage;
