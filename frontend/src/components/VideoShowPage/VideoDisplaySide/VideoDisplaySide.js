import './VideoDisplaySide.css';
import VidDisplay from './VidDisplay/VidDisplay';
import VidInfoBox from './VidInfoBox/VidInfoBox';
import CommentIndex from './CommentIndex/CommentIndex';
// import { getUser } from './store/users';
import { getVideo } from '../../../store/videos';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const VideoDisplaySide = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const video = useSelector(state => state.videos ? state.videos[id] : null)

   useEffect(() => {
      dispatch(getVideo(id));
   }, [])

   return (
      <div className='video-display-side'>
         <VidDisplay video={video} />
         <VidInfoBox video={video} />
         <CommentIndex />
      </div>
   )

}

export default VideoDisplaySide;