import VideoIndexItem from './VideoIndexItem';
import { useSelector } from 'react-redux';

const VideoIndex = () => {
   // const videos = useSelector(state => state.videos)

   return (
      <div className="video-index">
         {/* {videos.map(video => <VideoIndexItem videos={videos}/>)} */}
      </div>
   )
}

export default VideoIndex;