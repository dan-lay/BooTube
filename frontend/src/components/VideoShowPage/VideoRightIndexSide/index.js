import './VideoRightIndexSide.css';
import VideoSideIndex from './VideoSideIndex';
import VideoSideCatBar from './VideoSideCatBar';

const VideoRightIndexSide = () => {

   return (
      <div className='video-right-index-side'>
         <VideoSideCatBar />
         <VideoSideIndex />
      </div>
   )

}

export default VideoRightIndexSide;