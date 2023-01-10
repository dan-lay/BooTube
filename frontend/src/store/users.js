import csrfFetch from "./csrf";

export const RECEIVE_USER = 'users/RECEIVE_USER';
const RECEIVE_USERS = 'videos/RECEIVE_USERS';
const REMOVE_USER = 'videos/REMOVE_USER';

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
 
export const deleteUser = userId => async dispatch => {
   let res = await csrfFetch(`/api/users/${userId}`, {
     method: 'DELETE'
   })
   .then(dispatch(removeUser(userId)))
   // include errors
   
 
   // console.log(res)
 
   // if (res.ok) {
   //   dispatch(removeVideo(videoId));
   // }
}
  
const userReducer = (state = {}, action) => {
   Object.freeze(state);
   const nextState = { ...state };
 
   switch(action.type) {
      case RECEIVE_USER:
         nextState[action.payload.user.id] = action.payload.user;
         return nextState;
      case RECEIVE_USERS:
         return { ...nextState, ...action.payload.users}
      case REMOVE_USER:
         delete nextState[action.payload.userId];
         return nextState;
      default:
         return state;
   }
};
  
export default userReducer;