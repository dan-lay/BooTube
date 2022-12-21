import './VidDisplay.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { getVideo } from '../../../../store/videos';

const VidDisplay = (props) => {
   const video = props.video;
   const videoSource = video ? video.mediaObject : '';

   return (
      <div className='vid-display'>
         <video controls autoPlay type="video/mp4" src={videoSource} alt="video"/>
      </div>
   )

}

export default VidDisplay;