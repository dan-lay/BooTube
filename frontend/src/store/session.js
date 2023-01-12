import csrfFetch from "./csrf.js";
import { useSelector } from "react-redux";
import { REMOVE_USER } from "./users.js";

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
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return res;
};

export const restoreSession = () => async dispatch => {
  const res = await csrfFetch("/api/session");
  
  storeCSRFToken(res);
  const data = await res.json();

  storeCurrentUser(data.session);

  dispatch(setCurrentUser(data.session));

  return res;
};

export const signup = (user) => async (dispatch) => {
  const { email, password, firstName, lastName, handle} = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      handle
    })
  });

  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  
  return response;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return res;
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
