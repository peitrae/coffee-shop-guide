import React from "react";

const ErrorMessage = props => {
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
      default:
        return props.message;
    }
  };

  return <div className="errorMessage">{checkErrorMessage(props.message)}</div>;
};

export default ErrorMessage;
