import './VidDisplay.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { getVideo } from '../../../../store/videos';

const VidDisplay = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const videos = useSelector(state => state.videos ? state.videos[id] : null)
   const video = useSelector(state => state.videos[id]) || {title: ""};
   console.log("vid display:", id)

   useEffect(() => {
      console.log("use effect", id)
      if (video.id) dispatch(getVideo(id));
   }, [id])

   
   console.log(videos)

   // if (!videos) {
   //    return null
   // }

   return ( video.id &&
      <div className='vid-display'>
         <video controls="controls autoplay" type="video/mp4" src={videos ? videos.mediaObject : ''} alt="video"/>
      </div>
   )

}

export default VidDisplay;