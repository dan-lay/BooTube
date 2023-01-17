import './VidInfoBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { formatUploadDate } from '../../../../utils/dateFormatter';
import { formatLikeCount } from '../../../../utils/likeCountFormatter';
import { subscribeToUser, unsubscribeFromUser } from '../../../../store/users';

const VidInfoBox = (props) => {
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null);
   const video = props.video;
   const uploaderId = video ? video.uploaderId : null;
   const uploadTime = video ? formatUploadDate(video.createdAt) : null;
   const description = video ? video.description : null;
   const title = video ? video.title : null;
   const uploaderName = video ? video.uploaderName : null;
   const isSubscribed = sessionUser ? sessionUser.subbedChannelIds.includes(uploaderId) : false;

   const handleSubscribe = () => {
      if (sessionUser) {
         if (isSubscribed) {
            console.log("unsubbing now")
            dispatch(unsubscribeFromUser(uploaderId))
         } else {
            console.log("subbing now")
            dispatch(subscribeToUser(uploaderId))
         }
      } else {
         console.log("not logged in")
      }
   }

   useEffect(() => {

   }, [isSubscribed])

   const likeVideo = () => {
      // dispatch(addVideoLike(video.id))
   }
   
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
                  <div className='subscribe-button' onClick={handleSubscribe}>
                     {isSubscribed ? <p>Subscribed</p> :  <p>Subscribe</p>}
                  </div>
               </div>
            </div>
            <div className='vid-utilities'>
               <div className='vid-like-button' onClick={likeVideo}>
                  <i className='fa-regular fa-thumbs-up'></i>
                  <p>{video ? formatLikeCount(video.likes) : null}</p>
               </div>
               <div className='vid-dislike-button'>
                  <i className='fa-regular fa-thumbs-down'></i>
                  <p>{video ? formatLikeCount(video.dislikes) : null}</p>
               </div>
               <div className='share-button'>share
                  <i className="fa-solid fa-share"></i>
               </div>
               <div className='save-button'>save
                  <i className="fa-solid fa-folder-plus"></i>
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