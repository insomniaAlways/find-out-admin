import { sessionActionTypes } from "../action-types";

export function authenticate(payload) {
  const { email, password } = payload;
  // debugger;
  if (email != "" && password != "") {
    return {
      type: sessionActionTypes.AUTHENTICATION_SUCCESS
    };
  } else {
    alert("Fields can't be empty");
  }
}

export function unAuthenticate() {
  // debugger;
  return {
    type: sessionActionTypes.UNAUTHENTICATE_SUCCESS
  };
}

export function unAuthenticateInitiate() {
  // debugger;
  return {
    type: sessionActionTypes.UNAUTHENTICATE_REQUEST_INITIATED
  };
}

export function authenticateInitiate(payload) {
  const { email, password } = payload;
  // debugger;
  return {
    type: sessionActionTypes.AUTHENTICATION_REQUEST_INITIATED,
    email,
    password
  };
}
