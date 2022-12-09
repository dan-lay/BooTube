import './VidDisplay.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { getVideo } from '../../../../store/videos';

const VidDisplay = () => {
   const { videoId } = useParams();
   const dispatch = useDispatch();
   console.log(videoId)

   useEffect(() => {
      dispatch(getVideo(videoId));
   }, [])

   const videos = useSelector(state => state.videos? state.videos[videoId] : null)
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