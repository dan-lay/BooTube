import './VidDisplay.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { getVideo } from '../../../../store/videos';

const VidDisplay = () => {
   const { id } = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      // debugger
      dispatch(getVideo(id));
   }, [])

   const videos = useSelector(state => state.videos ? state.videos[id] : null)
   console.log(videos)

   if (!videos) {
      return null
   }

   return (
      <div className='vid-display'>
         <video controls="controls autoplay" type="video/mp4" src={videos ? videos.mediaObject : ''} alt="video"/>
      </div>
   )

}

export default VidDisplay;