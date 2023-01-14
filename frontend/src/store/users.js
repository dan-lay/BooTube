import csrfFetch from "./csrf";
import { logout, setCurrentUser, storeCurrentUser } from "./session";

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
 
 export const removeUser = userId => ({
   type: REMOVE_USER,
   payload: userId
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
};

export const editUser = (user, id) => async dispatch => {
   console.log(user)
   let res = await csrfFetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user)
   });

   if (res.ok) {
      console.log("all good")
      let data = await res.json()

      storeCurrentUser(Object.values(data.user)[0])
      dispatch(setCurrentUser(Object.values(data.user)[0]));

      return data;
   }
}
 
export const deleteUser = id => async dispatch => {
   await csrfFetch(`/api/users/${id}`, {method: 'DELETE'})
      .then(dispatch(removeUser(id)))
   // include errors
}

export const subscribeToUser = (subscriberId, id) => async dispatch => {
   let res = await csrfFetch(`/api/users/${subscriberId}/${id}`, {method: 'POST'})
   if (res.ok) {
      let data = await res.json();
      console.log(data)
   }
}

export const unsubscribeFromUser = (subscriberId, id) => async dispatch => {
   let res = await csrfFetch(`/api/users/${subscriberId}/${id}`, {method: 'DELETE'})
   if (res.ok) {
      let data = await res.json();
      console.log(data)
   }
}
  
const userReducer = (state = {}, action) => {
   Object.freeze(state);
   const nextState = { ...state };
 
   switch(action.type) {
      case RECEIVE_USER:
         return {...action.payload.user}
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