import './VideoShowPage.css';
import VideoRightIndexSide from './VideoRightIndexSide';
import VideoDisplaySide from './VideoDisplaySide/VideoDisplaySide';


const VideoShowPage = () => {

   return (
      <div className='video-show-page'>
         <VideoDisplaySide />
         <VideoRightIndexSide />
      </div> 
   )
}

export default VideoShowPage;