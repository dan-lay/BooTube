import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './VideoIndexItem.css';
import { formatUploadDate } from '../../../../utils/dateFormatter.js';

const VideoIndexItem = (props) => {
   const video = props.video;
   const history = useHistory();
   const uploaderName = video ? video.uploaderName : null;
   const uploadDate = video ? formatUploadDate(video.createdAt) : null;


   return (
      <Link to={`/videos/${video.id}`}>      
         <div className="video-index-item">
            <div className='thumbnail-container'>
               <video className='thumbnail'>
                  <source type="video/mp4" src={video.mediaObject}/>
               </video>
            </div>
            <div className='index-item-bottom'>
               <div className='index-item-left'>

               </div>
               <div className='index-item-right'>
                  <div className='item-title-container'>
                     <p className='index-title'>{video.title}</p>
                  </div>
                  <div className='item-info-container'>
                     <p className='item-channel-name'>{uploaderName}</p>
                     <div className='item-info'>
                        <p className='item-uploader'>views</p>
                        <p className='spacer'>.</p>
                        <p className='item-date'>{uploadDate}</p>
                     </div>
                     
                  </div>

               </div>
            </div>
         
         </div>
      </Link>
   )
}

export default VideoIndexItem;