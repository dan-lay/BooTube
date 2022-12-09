import './VideoShowPage.css';
import VideoRightIndexSide from './VideoRightIndexSide';
import VideoDisplaySide from './VideoDisplaySide/VideoDisplaySide';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBar from '../TopBar/TopBar';

const VideoShowPage = () => {
   const currentUser = useSelector(state => state.session.user);
   console.log(currentUser)
   if (!currentUser) return <Redirect to="/"/>;

   return (
      <div className='video-show-page'>
         <TopBar />
         <div className='bottom-video-show-page'>
            <VideoDisplaySide />
            <VideoRightIndexSide />
         </div>
      </div>
   )
}

export default VideoShowPage;