import './VideoDisplaySide.css';
import VidDisplay from './VidDisplay/VidDisplay';
import VidInfoBox from './VidInfoBox/VidInfoBox';
import CommentIndex from './CommentIndex/CommentIndex';
import VideoShowDescription from './VideoShowDecription/VideoShowDescription';

const VideoDisplaySide = () => {

   return (
      <div className='video-display-side'>
         <VidDisplay />
         <VidInfoBox />
         {/* <VideoShowDescription /> */}
         <CommentIndex />
      </div>
   )

}

export default VideoDisplaySide;