import './VideoDisplaySide.css';
import VidDisplay from './VidDisplay';
import VidInfoBox from './VidInfoBox';
import CommentIndex from './CommentIndex';
import VideoShowDescription from './VideoShowDecription';

const VideoDisplaySide = () => {

   return (
      <div className='video-display-side'>
         <VidDisplay />
         <VidInfoBox />
         <VideoShowDescription />
         <CommentIndex />
      </div>
   )

}

export default VideoDisplaySide;