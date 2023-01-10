import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './VideoIndexItem.css';
import { formatUploadDate } from '../../../../utils/dateFormatter.js';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../../store/users.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const VideoIndexItem = (props) => {
   const video = props.video;
   const history = useHistory();
   const uploaderId = video ? video.uploaderId : null;
   const uploaderHandle = video ? video.uploaderHandle : null;
   const uploadDate = video ? formatUploadDate(video.createdAt) : null;

   const viewProfile = e => {
      e.stopPropagation()
      history.push(uploaderHandle)
   }

   const viewVideo = () => {
      history.push(`/videos/${video.id}`)
   }

   return (
      <div className="video-index-item" onClick={viewVideo}>
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
                  <p className='item-channel-name' onClick={e => viewProfile(e)}>{uploaderHandle}</p>
                  <div className='item-info'>
                     <p className='item-view-count'>views</p>
                     <p className='spacer'>.</p>
                     <p className='item-date'>{uploadDate}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   )
}

export default VideoIndexItem;