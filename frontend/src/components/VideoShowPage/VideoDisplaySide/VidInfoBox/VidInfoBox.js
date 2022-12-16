import './VidInfoBox.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { formatUploadDate } from '../../../../utils/dateFormatter';

const VidInfoBox = (props) => {
   const video = props.video;
   const uploadTime = video ? formatUploadDate(video.createdAt) : null;
   const description = video ? video.description : null;
   const title = video ? video.title : null;
   const uploaderName = video ? video.uploaderName : null;
   
   return (
      <div className='vid-info-box'>
         <div className='title-hashtag-container'>
            <div className='hashtags'>hashtags</div>
            <p className='show-title'>{title}</p>
         </div>
         <div className='utility-row'>
            <div className='channel-utilities'>
               <div className='channel-subcontainer'>
                  <div className='channel-icon'>

                  </div>
                  <div className='channel-info'>
                     <p className='channel-name'>{uploaderName}</p>
                     <p className='subscriber-count'>subscribers</p>
                  </div>
                  <div className='subscribe-button'>
                     <p>Subscribe</p>
                  </div>
               </div>
            </div>
            <div className='vid-utilities'>
               <div className='vid-like-button'>like
      

               </div>
               <div className='vid-dislike-button'>dislike

               </div>
               <div className='share-button'>share

               </div>
               <div className='save-button'>save

               </div>
               <div className='jumpscare-button'>!!!

               </div>

            </div>
         </div>
         <div className='vid-description-container'>
            <div className='vid-description'>
               <div className='view-timestamp-container'>
                  <p className='viewcount'>views</p>
                  <p className='timestamp'>{uploadTime}</p>
               </div>
               <p className='description'>{description}</p>
            </div>
         </div>

      </div>
   )

}

export default VidInfoBox;