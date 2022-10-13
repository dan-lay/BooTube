import csrfFetch from "./csrf";

const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

/*--ACTIONS--*/

export const receiveUser = user => ({
   type: RECEIVE_USER,
   user
 });
 
 export const removeUser = userId => ({
   type: REMOVE_USER,
   userId
 });
 
 /*--THUNK ACTIONS--*/

//  export const loginUser = user => async dispatch => {
//    let res = await csrfFetch('/api/session', {
//      method: 'POST',
//      body: JSON.stringify(user)
//    });
//    let data = await res.json();
//    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
//    dispatch(receiveUser(data.user));
//  };
 
//  export const logoutUser = userId => async dispatch => {
//    await csrfFetch('/api/session', {
//      method: 'DELETE'
//    });
//    sessionStorage.setItem('currentUser', null);
//    dispatch(removeUser(userId));
//  };
 
 export const createUser = user => async dispatch => {
   let res = await csrfFetch('/api/users', {
     method: 'POST',
     body: JSON.stringify(user)
   });
   let data = await res.json();
   sessionStorage.setItem('currentUser', JSON.stringify(data.user));
   dispatch(receiveUser(data.user));
 };
 
 const userReducer = (state = {}, action) => {
   Object.freeze(state);
   
   const nextState = { ...state };
 
   switch(action.type) {
     case RECEIVE_USER:
       nextState[action.user.id] = action.user;
       return nextState;
     case REMOVE_USER:
       delete nextState[action.userId];
       return nextState;
     default:
       return state;
   }
 };
 
 export default userReducer;