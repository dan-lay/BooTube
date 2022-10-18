import './VideoShowPage.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideo } from '../../store/videos';

const VideoShowPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();

   // const [video] = useState()
     
 
   useEffect(() => {
      dispatch(getVideo(id));
      console.log("coming from the useeffect")
      // console.log(video.mediaObject)
   }, [])

   const videos = useSelector(state => state.videos)

   if (videos) console.log(videos[id].mediaObject)

   return (
      <div className='video-show-page'>
         <div className='video-port'>
         <video controls="controls autoplay" type="video/mp4" src={videos ? videos[id].mediaObject : ''} alt="video"
            // <source type="video/mp4" src={videos ? videos[id].mediaObject : ''} alt="video"/>
         />
         </div>
      </div>
   )
}

export default VideoShowPage;