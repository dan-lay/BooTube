import csrfFetch from "./csrf";

// thunk actions

const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';

// thunk action creators

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});
 
export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
});

// dispatches

// export const getComment = comment => async dispatch => {
//   let res = await csrfFetch(`/api/video/${comment.videoId}`)
//   let data = await res.json();
//   dispatch(receiveComment(data));
// };

export const getComments = (videoId) => async dispatch => {
  let res = await csrfFetch(`/api/videos/${videoId}`);
  let data = await res.json();
  dispatch(receiveComments(data.comments));
};

export const createComment = comment => async dispatch => {
  let res = await csrfFetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    let data = await res.json();
    // console.log(data.message)
  }
  // dispatch(getVideo(data.comment.videoId));
};

export const updateComment = comment => async dispatch => {
  let res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'PATCH',
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receiveComment(data.comments[comment.id]));
  }

  return res;
}

export const deleteComment = commentId => async dispatch => {
  let res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  })
  .then(dispatch(removeComment(commentId)))
  .catch(errors => JSON.stringify(errors))
  // include errors
  

  // console.log(res)

  // if (res.ok) {
  //   dispatch(removeVideo(videoId));
  // }
}

// reducer
 
const commentReducer = (state = {}, action) => {
  Object.freeze(state);
  
  const nextState = { ...state };

  switch(action.type) {
    case RECEIVE_VIDEO:
      return action.data.comments;
    case RECEIVE_COMMENT:
      nextState[action.comment.id] = action.comment;
      return nextState;
    // case RECEIVE_COMMENTS:
    //   return { ...nextState, ...action.comments}
    case REMOVE_COMMENT:
      delete nextState[action.commentId];
      return nextState;
    default:
      return state;
  }
};
 
export default commentReducer;