const makeGoogleOAuthRequestURL = () => {
  let requestURL = `${process.env.REACT_APP_OAUTH2ENDPOINT}?`;
  requestURL += `client_id=${process.env.REACT_APP_CLIENT_ID}&`;
  requestURL += `redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&`;
  requestURL += `response_type=token&`;
  requestURL += `scope=${process.env.REACT_APP_SCOPE}`;
  return requestURL;
};

export { makeGoogleOAuthRequestURL };
