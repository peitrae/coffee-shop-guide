export const GET_MEMBER_TOKEN = localStorage.getItem("token");

export const updateState = (oldState, updatedState) => {
    return {
      ...oldState,
      ...updatedState
    };
  }; 




  