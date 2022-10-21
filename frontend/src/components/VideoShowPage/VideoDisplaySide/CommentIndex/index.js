import CommentIndexItem from "./CommentIndexItem";
import './CommentIndex.css';
import { getComment, createComment } from '../../../../store/comments';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideo } from '../../../../store/videos'



const CommentIndex = () => {
   const { videoId } = useParams();
   const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
   const [body, setBody] = useState("");
   const commenterId = useSelector(state => state.session.user?.id)
   const dispatch = useDispatch();
   const [errors, setErrors] = useState([]);

   const handleSubmit = e => {
      e.preventDefault();
      setErrors([]);
      return dispatch(createComment({body, commenterId, videoId}))
         .catch(async (res) => {
            let data;
            try {
               data = await res.clone().json();
            } catch {
               data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
         })
         // .then(dispatch(getVideo(videoId)))
   }

   const handleCancel = e => {
      e.preventDefault();
      return setBody("");
   }

   useEffect(() => {
      dispatch(getVideo(videoId));
   }, [])

   return (
      <div className="comment-index">
         <div className="comment-box">
            <div className="comment-index-info">

            </div>
            <div>
               <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="Add a comment..." onChange={e => setBody(e.target.value)}></input>
                  <button className="cancel-button" onClick={e => handleCancel(e)}>CANCEL</button>
                  <input type="submit" className="submit-comment" value="COMMENT"></input>
               </form>
            </div>
         </div>
         {comments.map(comment => <CommentIndexItem key={comment.id} comment={comment}/>)}
      </div>
   )
}

export default CommentIndex;