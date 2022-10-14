import VideoIndexItem from './VideoIndexItem';
import { useSelector } from 'react-redux';
import "./VideoIndex.css"

const VideoIndex = () => {
   // const videos = useSelector(state => state.videos)

   return (
      <div className="video-index">Video index
         {/* {videos.map(video => <VideoIndexItem video={video}/>)} */}
      </div>
   )
}

export default VideoIndex;