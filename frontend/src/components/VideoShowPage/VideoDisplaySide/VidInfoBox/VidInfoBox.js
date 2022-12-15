import './VidInfoBox.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const VidInfoBox = () => {
   const video = useSelector(state => state.videos ? state.videos[1] : null)

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

            </div>
         </div>

      </div>
   )

}

export default VidInfoBox;