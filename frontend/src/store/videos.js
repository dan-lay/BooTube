import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./users";

export const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO';
export const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEOS';
const REMOVE_VIDEO = 'videos/REMOVE_VIDEO';

/*--ACTIONS--*/

export const receiveVideo = data => ({
  type: RECEIVE_VIDEO,
  data
});
 
export const receiveVideos = videos => ({
  type: RECEIVE_VIDEOS,
  videos
});

export const removeVideo = videoId => ({
  type: REMOVE_VIDEO,
  videoId
});



/*--ACTION CREATERS--*/ 

export const getVideo = videoId => async dispatch => {
  let res = await csrfFetch(`/api/videos/${videoId}`)
  let data = await res.json();
  console.log(data)
  dispatch(receiveVideo(data));
};

export const getVideos = () => async dispatch => {
  let res = await csrfFetch('/api/videos');
  let data = await res.json();
  dispatch(receiveVideos(data));
};

export const createVideo = video => async dispatch => {
  let res = await csrfFetch('/api/videos', {
    method: 'POST',
    body: video
  });

  if (res.ok) {
    let data = await res.json();
    return data;
  }

  

  // dispatch(receiveVideo(data.mediaObject));
};

export const deleteVideo = videoId => async dispatch => {
  let res = await csrfFetch(`/api/videos/${videoId}`, {
    method: 'DELETE'
  })
  .then(dispatch(removeVideo(videoId)))
  // include errors
  

  // console.log(res)

  // if (res.ok) {
  //   dispatch(removeVideo(videoId));
  // }


}
 

 
const videoReducer = (state = {}, action) => {
  Object.freeze(state);
  
  const nextState = { ...state };

  switch(action.type) {
    case RECEIVE_USER:
      return {...action.payload.videos}
    case RECEIVE_VIDEO:
      nextState[action.data.video.id] = action.data.video;
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