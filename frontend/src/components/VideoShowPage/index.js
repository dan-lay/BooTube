import './VideoShowPage.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getVideo } from '../../store/videos';

const VideoShowPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   
 
   useEffect(() => {
      dispatch(getVideo(id));
   }, [])

   const video = useSelector(state => state.videos ? state.videos.id : {})

   return (
      <div className='video-show-page'>
         <div className='video-port'>
         <video controls="controls autoplay">
            <source type="video/mp4" src={video ? video.mediaObject : ''} alt="video"/>
         </video>
         </div>
      </div>
   )
}

export default VideoShowPage;