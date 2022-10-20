import CommentIndexItem from "./CommentIndexItem";
import './CommentIndex.css';
import { getComments } from '../../../../store/comments';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideo } from '../../../../store/videos'



const CommentIndex = () => {
   const { videoId } = useParams();
   const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getVideo(videoId))
   }, [])

   return (
      <div className="comment-index">
         <div className="comment-box">
            <div className="comment-index-info">

            </div>
         </div>
         {comments.map(comment => <CommentIndexItem key={comment.id} comment={comment}/>)}
      </div>
   )
}

export default CommentIndex;