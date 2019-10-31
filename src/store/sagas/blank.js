fetch(url, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: { 'Content-Type' : 'application/json'}
  })
    .then( response => {
      return response.json();
    })
    .then(responseData => {
      const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000);

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', responseData.localId);
      put(actions.authSuccess(responseData.idToken, responseData.localId));
      put(actions.checkAuthTimeout(responseData.expiresIn));
    })