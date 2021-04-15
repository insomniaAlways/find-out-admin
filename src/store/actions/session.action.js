import { sessionActionTypes } from "../action-types";

export function authenticate(payload) {
  const { email, password } = payload;
  if (email != "" && password != "") {
    return {
      type: sessionActionTypes.AUTHENTICATION_SUCCESS
    };
  } else {
    alert("Fields can't be empty");
  }
}

export function unAuthenticate() {
  return {
    type: sessionActionTypes.UNAUTHENTICATE_SUCCESS
  };
}

export function unAuthenticateInitiate() {
  return {
    type: sessionActionTypes.UNAUTHENTICATE_REQUEST_INITIATED
  };
}

export function authenticateInitiate(payload) {
  const { email, password } = payload;

  return {
    type: sessionActionTypes.AUTHENTICATION_REQUEST_INITIATED,
    email,
    password
  };
}
