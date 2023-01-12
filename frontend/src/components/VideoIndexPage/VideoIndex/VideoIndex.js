import VideoIndexItem from './VideoIndexItem/VideoIndexItem';
import { useDispatch, useSelector } from 'react-redux';
import "./VideoIndex.css"
import { useEffect } from 'react';
import { getVideos } from '../../../store/videos';
import { receiveUser } from '../../../store/users';

const VideoIndex = () => {
   const videos = useSelector(state => state.videos);
   const videoArr = videos ? Object.values(videos) : [];
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getVideos());
      dispatch(receiveUser({user: null}))
   }, [])
   

   return (
      <div className="video-index">
         {videoArr.map(video => <VideoIndexItem key={video.id} video={video}/>)}
      </div>
   )
}

export default VideoIndex;