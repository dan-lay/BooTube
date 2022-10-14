import VideoIndexItem from './VideoIndexItem';
import { useSelector } from 'react-redux';
import "./VideoIndex.css"

const VideoIndex = () => {
   const videos = useSelector(state => state.videos);
   console.log(videos);
   const videoArr = videos ? Object.values(videos) : [];
   

   return (
      <div className="video-index">Video index
         {videoArr.map(video => <VideoIndexItem video={video}/>)}
      </div>
   )
}

export default VideoIndex;