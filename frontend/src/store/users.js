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



/*--ACTION-CREATORS--*/

export const getUser = handle => async dispatch => {
   let res = await csrfFetch(`/api/users/${handle}`)
   
   let data = await res.json();

   dispatch(receiveUser(data));
   return data;
};


export const getUsers = () => async dispatch => {
   let res = await csrfFetch('/api/users');
   let data = await res.json();
   dispatch(receiveUsers(data));
};


export const createUser = user => async dispatch => {
   const { email, password, firstName, lastName, handle} = user;
   
   let res = await csrfFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
         email,
         password,
         firstName,
         lastName,
         handle
      })
   });
 
   if (res.ok) {
      const data = await res.json();
      
      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data));
   }

   return res;
};

export const editUser = (user, id) => async dispatch => {
   let res = await csrfFetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user)
   });

   if (res.ok) {
      let data = await res.json()

      storeCurrentUser(Object.values(data.user)[0])
      dispatch(setCurrentUser(Object.values(data.user)[0]));

      return data;
   }
}
 

export const deleteUser = id => async dispatch => {
   await csrfFetch(`/api/users/${id}`, {method: 'DELETE'})
      .then(dispatch(removeUser(id)))
      .then(dispatch(logout()))
   // include errors
}


export const subscribeToUser = id => async dispatch => {
   let res = await csrfFetch(`/api/users/subscribe/${id}`, {method: 'POST'})
   if (res.ok) {
      let data = await res.json();
   }
}


export const unsubscribeFromUser = id => async dispatch => {
   let res = await csrfFetch(`/api/users/unsubscribe/${id}`, {method: 'DELETE'})
   if (res.ok) {
      let data = await res.json();
   }
}

export const checkEmail = email => async dispatch => {
   const res = await csrfFetch('/api/users/email', {
     method: "POST",
     body: JSON.stringify({email})
   })

   if (res.ok) {
     const data = await res.json()
     dispatch(receiveUser(data))
   }
 
   return res;
 }



/*--REDUCER--*/
  
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