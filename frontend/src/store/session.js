import csrfFetch from "./csrf.js";
import { useSelector } from "react-redux";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const login = ({ email, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  console.log(data)
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const restoreSession = () => async dispatch => {

  const response = await csrfFetch("/api/session");
  console.log(response)
  storeCSRFToken(response);
  const data = await response.json();

  console.log(data)
  storeCurrentUser(data.session);

  dispatch(setCurrentUser(data.session));

  return response;
};

export const signup = (user) => async (dispatch) => {
  const { email, password, firstName, lastName} = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName
    })
  });

  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  
  return response;
};

export const logout = () => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  if (response) console.log(response);

  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};


const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {

  Object.freeze(state);
  const newState = { ...state }


  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...newState, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...newState, user: null };
    default:
      return newState;
  }
};

export default sessionReducer;
