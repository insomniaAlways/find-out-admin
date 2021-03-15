const initialState = {
  isLoading: false,
  isAuthenticated: false,
  tokenResponse: null,
  details: null,
  authorization: null,
  user: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        details: action.session,
        authorization: action.authorization,
        user: action.user
      };
    case "UNAUTHENTICATE_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        details: null,
        authorization: null,
        user: null
      };
    }
    default:
      return state;
  }
};

export default session;
