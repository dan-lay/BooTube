import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './VideoIndexItem.css';

const VideoIndexItem = (props) => {
   const video = props.video;
   const history = useHistory();

   return (
      <Link to={`/videos/${video.id}`}>      
         <div className="video-index-item" >
            <video className='thumbnail'>
               <source type="video/mp4" src={video.mediaObject}/>
            </video>
            <div className='index-item-bottom'>
               <p className='index-title'>{video.title}</p>
            </div>
         
         </div>
      </Link>
   )
}

export default VideoIndexItem;