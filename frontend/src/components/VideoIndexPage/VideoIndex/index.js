import VideoIndexItem from './VideoIndexItem';
import { useDispatch, useSelector } from 'react-redux';
import "./VideoIndex.css"
import { useEffect } from 'react';
import { getVideos } from '../../../store/videos';

const VideoIndex = () => {
   const videos = useSelector(state => state.videos);
   const videoArr = videos ? Object.values(videos) : [];
   const dispatch = useDispatch();
   
   // const user = useSelector(state => state.session)

   useEffect(() => {
      dispatch(getVideos());
      console.log("coming from video index")
   }, [])
   

   return (
      <div className="video-index">
         {videoArr.map(video => <VideoIndexItem key={video.id} video={video}/>)}
      </div>
   )
}

export default VideoIndex;