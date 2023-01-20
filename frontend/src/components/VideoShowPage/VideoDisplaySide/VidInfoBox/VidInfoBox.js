import './VidInfoBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { formatUploadDate } from '../../../../utils/_dateFormatter';
import { formatLikeCount } from '../../../../utils/likeCountFormatter';
import { subscribeToUser, unsubscribeFromUser } from '../../../../store/users';
import { ProfilePic } from '../../../../utils/ProfPic/ProfilePic'
import { useHistory } from 'react-router-dom';

const VidInfoBox = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null);
   const video = props.video;
   const uploaderId = video ? video.uploaderId : null;
   const uploaderHandle = video ? video.uploaderHandle : null;
   const uploadTime = video ? formatUploadDate(video.createdAt) : null;
   const description = video ? video.description : null;
   const title = video ? video.title : null;
   const uploaderName = video ? video.uploaderName : null;
   const isMyVideo = (video && sessionUser) ? (uploaderId === sessionUser.id ? true : false) : null;
   const isSubscribed = sessionUser ? sessionUser.subbedChannelIds.includes(uploaderId) : false;
   const channelIcon = video ? video.channelIcon : null;
   const channelSubCount = video ? (video.channelSubCount === 0 ? "No" : video.channelSubCount) : null;

   const handleSubscribe = () => {
      if (sessionUser) {
         if (isSubscribed) {
            dispatch(unsubscribeFromUser(uploaderId))
         } else {
            dispatch(subscribeToUser(uploaderId))
         }
      } else {
         history.push("/login")
      }
   }

   useEffect(() => {

   }, [isSubscribed])

   const visitProfile = () => {
      history.push(`/${uploaderHandle}`)
   }

   const likeVideo = () => {
      // dispatch(addVideoLike(video.id))
   }

   const dislikeVideo = () => {
      // dispatch(addVideoDisike(video.id))
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
                  <div className='channel-icon' onClick={visitProfile}>
                     {video && <ProfilePic image={channelIcon} firstName={uploaderName}/>}
                  </div>
                  <div className='channel-info'>
                     <p className='channel-name' onClick={visitProfile}>{uploaderName}</p>
                     <p className='subscriber-count'>{`${channelSubCount} subscribers`}</p>
                  </div>
                  { !isMyVideo && <div className='subscribe-button' onClick={handleSubscribe}>
                     {isSubscribed ? <p>Subscribed</p> :  <p>Subscribe</p>}
                  </div> }
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