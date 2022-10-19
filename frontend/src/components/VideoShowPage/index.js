import './VideoShowPage.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideo } from '../../store/videos';
import CommentIndex from './CommentIndex';
import { getComments } from '../../store/comments';
import MastHead from '../VideoIndexPage/MastHead';

const VideoShowPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
     
 
   useEffect(() => {
      dispatch(getVideo(id));
   }, [])

   const videos = useSelector(state => state.videos)
   // const comments = videos ? videos.commentIds

   return (
      <div className='video-show-page'>
         <MastHead />
         <div className='video-port'>
            <video controls="controls autoplay" type="video/mp4" src={videos ? videos[id].mediaObject : ''} alt="video"/>
         </div>
         <div className='comment-index-outer-container'>
            <CommentIndex />
         </div>
      </div>
   )
}

export default VideoShowPage;