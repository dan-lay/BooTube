import csrfFetch from "./csrf";

const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';
const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEOS';
const REMOVE_VIDEO = 'videos/REMOVE_VIDEO';

/*--ACTIONS--*/

export const receiveVideo = video => ({
  type: RECEIVE_VIDEO,
  video
});
 
export const receiveVideos = videos => ({
  type: RECEIVE_VIDEOS,
  videos
});

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

export const getVideos = () => async dispatch => {
  let res = await csrfFetch('/api/videos');
  console.log(res)
  let data = await res.json();
  console.log(data)
  dispatch(receiveVideos(data));
};

export const createVideo = video => async dispatch => {
  let res = await csrfFetch('/api/videos', {
    method: 'POST',
    body: video
  });

  if (res.ok) {
    let data = await res.json();
    console.log(data.message)
  }
  

  // dispatch(receiveVideo(data.mediaObject));
};
 
export const getVideo = videoId => async dispatch => {
  let res = await csrfFetch(`/api/videos/${videoId}`)
  let data = await res.json();
  dispatch(receiveVideo(data.video));
};
 
const videoReducer = (state = {}, action) => {
  Object.freeze(state);
  
  const nextState = { ...state };

  switch(action.type) {
    case RECEIVE_VIDEO:
      nextState[action.video.id] = action.video;
      return nextState;
    case RECEIVE_VIDEOS:
      return { ...nextState, ...action.videos}
    case REMOVE_VIDEO:
      delete nextState[action.videoId];
      return nextState;
    default:
      return state;
  }
};
 
export default videoReducer;