import csrfFetch from "./csrf.js";
import { REMOVE_USER } from "./users.js";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';



/*--ACTIONS--*/

export const setCurrentUser = (data) => ({
  type: SET_CURRENT_USER,
  payload: data
});


const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});



/*--BROWSER STORAGE--*/

const storeCSRFToken = res => {
  const csrfToken = res.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}



/*--ACTION CEREATORS--*/

export const login = ({ email, password }) => async dispatch => {
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  console.log("login", data)

  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data));
  return res;
};


export const restoreSession = () => async dispatch => {
  const res = await csrfFetch("/api/session");
  
  storeCSRFToken(res);

  const data = await res.json();
  console.log("restore session", data)
  console.log(data.user)

  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data));

  return res;
};


export const logout = () => async dispatch => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return res;
};



/*--REDUCER--*/

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {

  Object.freeze(state);
  const newState = { ...state }

  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...newState, ...action.payload };
    case REMOVE_CURRENT_USER:
      return { user: null };
    default:
      return newState;
  }
};

export default sessionReducer;
