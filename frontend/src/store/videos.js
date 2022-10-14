import csrfFetch from "./csrf";

const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';
// const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEO';
const REMOVE_VIDEO = 'videos/REMOVE_VIDEO';

/*--ACTIONS--*/

export const receiveVideo = video => ({
  type: RECEIVE_VIDEO,
  video
});
 
// export const receiveVideos = () => ({
//   type: RECEIVE_VIDEOS
// });

export const removeVideo = videoId => ({
  type: REMOVE_VIDEO,
  videoId
});
 
 /*--THUNK ACTIONS--*/

//  export const loginvideo = video => async dispatch => {
//    let res = await csrfFetch('/api/session', {
//      method: 'POST',
//      body: JSON.stringify(video)
//    });
//    let data = await res.json();
//    sessionStorage.setItem('currentvideo', JSON.stringify(data.video));
//    dispatch(receivevideo(data.video));
//  };
 
//  export const logoutvideo = videoId => async dispatch => {
//    await csrfFetch('/api/session', {
//      method: 'DELETE'
//    });
//    sessionStorage.setItem('currentvideo', null);
//    dispatch(removevideo(videoId));
//  };
 
export const createVideo = video => async dispatch => {
  let res = await csrfFetch('/api/videos', {
    method: 'POST',
    body: JSON.stringify(video)
  });
  let data = await res.json();
  sessionStorage.setItem('currentvideo', JSON.stringify(data.video));
  dispatch(receiveVideo(data.video));
};
 
const videoReducer = (state = {}, action) => {
  Object.freeze(state);
  
  const nextState = { ...state };

  switch(action.type) {
    case RECEIVE_VIDEO:
      nextState[action.video.id] = action.video;
      return nextState;
    // case RECEIVE_VIDEOS:
    //   nextState[action.video.id] = action.video;
    //   return nextState;
    case REMOVE_VIDEO:
      delete nextState[action.videoId];
      return nextState;
    default:
      return state;
  }
};
 
export default videoReducer;