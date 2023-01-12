import csrfFetch from "./csrf";
import { logout } from "./session";

export const RECEIVE_USER = 'users/RECEIVE_USER';
const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const REMOVE_USER = 'users/REMOVE_USER';

/*--ACTIONS--*/

export const receiveUser = data => ({
   type: RECEIVE_USER,
   payload: data
});
  
 export const receiveUsers = users => ({
   type: RECEIVE_USERS,
   payload: users
});
 
 export const removeUser = handle => ({
   type: REMOVE_USER,
   payload: handle
});

/*--ACTION-CREATERS--*/

export const getUser = handle => async dispatch => {
   let res = await csrfFetch(`/api/users/${handle}`)
   console.log(res)
   let data = await res.json();
   console.log(data)
   dispatch(receiveUser(data));
   return data;
};

export const getUsers = () => async dispatch => {
   let res = await csrfFetch('/api/users');
   let data = await res.json();
   dispatch(receiveUsers(data));
};
 
export const createUser = user => async dispatch => {
   let res = await csrfFetch('/api/users', {
      method: 'POST',
      body: user
   });
 
   if (res.ok) {
     let data = await res.json();
     return data;
   }
 
   
 
   // dispatch(receiveVideo(data.mediaObject));
};
 
export const deleteUser = handle => async dispatch => {
   await dispatch(logout())
      .then(csrfFetch(`/api/users/${handle}`, {method: 'DELETE'}))
   // let res = await csrfFetch(`/api/users/${userId}`, {
   //   method: 'DELETE'
   // })
      .then(dispatch(removeUser(handle)))
   // include errors
   
 
   // console.log(res)
 
   // if (res.ok) {
   //   dispatch(removeVideo(videoId));
   // }
   // return res;
}
  
const userReducer = (state = {}, action) => {
   Object.freeze(state);
   const nextState = { ...state };
 
   switch(action.type) {
      case RECEIVE_USER:
         nextState[action.payload.user.handle] = action.payload.user;
         return nextState;
      case RECEIVE_USERS:
         return { ...nextState, ...action.payload.users}
      case REMOVE_USER:
         delete nextState[action.payload];
         return nextState;
      default:
         return state;
   }
};
  
export default userReducer;