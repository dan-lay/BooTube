import './VidInfoBox.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const VidInfoBox = () => {
   const video = useSelector(state => state.videos ? state.videos[1] : null)
   const uploadTime = video ? video.createdAt : null;
   const description = video ? video.description : null;
   
   const formatUploadDate = date => {
      const then = new Date(date);
      const now = new Date();

      let timeText;
      let timeDiff;
      let timeElapsed = (now - then) / 1000;

      if (Math.round(timeElapsed / 31540000) >= 1) {
         timeDiff = Math.round(timeElapsed /= 31540000);
         timeText = timeDiff === 1 ? "year" : "years";
      } else if (Math.round(timeElapsed / 2628000) >= 1) {
         timeDiff = Math.round(timeElapsed /= 2628000);
         timeText = timeDiff === 1 ? "month" : "months";
      } else if (Math.round(timeElapsed / 86400) >= 1) {
         timeDiff = Math.round(timeElapsed /= 86400);
         timeText = timeDiff === 1 ? "day" : "days"
      } else if (Math.round(timeElapsed / 3600) >= 1) {
         timeDiff = Math.round(timeElapsed /= 3600);
         timeText = timeDiff === 1 ? "hour" : "hours"
      } else {
         timeDiff = Math.round(timeElapsed /= 60);
         timeText = timeDiff === 1 ? "minute" : "minutes"
      }

      return `${timeDiff} ${timeText} ago`
   }

   return (
      <div className='vid-info-box'>
         <div className='title-hashtag-container'>
            <div className='hashtags'>hashtags</div>
            <p className='show-title'>{`${video ? video.title : null}`}</p>
         </div>
         <div className='utility-row'>
            <div className='channel-utilities'>
               <div className='channel-subcontainer'>
                  <div className='channel-icon'>

                  </div>
                  <div className='channel-info'>

                  </div>
                  <div className='subscribe-button'>

                  </div>
               </div>
            </div>
            <div className='video-utilities'>

            </div>
         </div>
         <div className='vid-description-container'>
            <div className='vid-description'>
               <div className='view-timestamp-container'>
                  <p className='viewcount'>views</p>
                  <p className='timestamp'>{`${uploadTime ? formatUploadDate(uploadTime) : null}`}</p>
               </div>
               <p className='description'>{description}</p>
            </div>
         </div>

      </div>
   )

}

export default VidInfoBox;