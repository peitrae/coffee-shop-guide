export const GET_AUTH_TOKEN = localStorage.getItem("token");

export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
  }; 
  