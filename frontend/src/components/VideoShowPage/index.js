import './VideoShowPage.css';
import MastHead from '../VideoIndexPage/MastHead';
import VideoRightIndexSide from './VideoRightIndexSide';
import VideoDisplaySide from './VideoDisplaySide';
import { Redirect } from 'react-router-dom';

const VideoShowPage = () => {

   if (!currentUser) return <Redirect to="/"/>;

   return (
      <div className='video-show-page'>
         <MastHead />
         <div className='bottom-video-show-page'>
            <VideoDisplaySide />
            <VideoRightIndexSide />
         </div>
      </div>
   )
}

export default VideoShowPage;