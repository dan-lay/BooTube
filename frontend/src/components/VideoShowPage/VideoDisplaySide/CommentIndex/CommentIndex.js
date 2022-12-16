import CommentIndexItem from "./CommentIndexItem/CommentIndexItem";
import './CommentIndex.css';
import { getComment, createComment } from '../../../../store/comments';
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CommentIndex = () => {
   const history = useHistory();
   const { id } = useParams();
   const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
   const commentCount = comments ? (comments.length >= 1000 ? `${comments.length / 1000.0}K Comments` : `${comments.length} Comments`) : null;
   const [body, setBody] = useState("");
   const signedIn = useSelector(state => state.session.user ? true : false)
   const commenterId = useSelector(state => state.session.user?.id)
   const dispatch = useDispatch();
   const [errors, setErrors] = useState([]);

   const handleSubmit = e => {
      e.preventDefault();
      setErrors([]);
      return dispatch(createComment({body, commenterId, id}))
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

   const handleClick = e => {
      e.preventDefault();
      if (!signedIn) history.push("/login");
   }

   const handleCancel = e => {
      e.preventDefault();
      return setBody("");
   }

   return (
      <div className="comment-index">
         <div className="comment-box">
            <div className="comment-index-info">
               <p className="comment-count">{commentCount}</p>
               <div className="comment-sort-button">Sort by</div> {/* this will be changed */}
            </div>
            <div className="comment-form-container">
               <div className="commenter-icon-container"></div>
               <form id="comment-form" onSubmit={handleSubmit}></form>
               <input className="comment-input" htmlFor="comment-form" type="text" placeholder="Add a comment..." onClick={e => handleClick(e)} onChange={e => setBody(e.target.value)}></input>
               {/* <button className="cancel-button" onClick={e => handleCancel(e)}>CANCEL</button>
               <input type="submit" className="submit-comment" value="COMMENT"></input> */}
            </div>
         </div>
         {comments.map(comment => <CommentIndexItem key={comment.id} comment={comment}/>)}
      </div>
   )
}

export default CommentIndex;