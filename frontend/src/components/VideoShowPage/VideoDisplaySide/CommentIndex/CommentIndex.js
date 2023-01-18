import CommentIndexItem from "./CommentIndexItem/CommentIndexItem";
import './CommentIndex.css';
import { getComment, getComments, createComment } from '../../../../store/comments';
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProfilePic } from '../../../../utils/ProfPic/ProfilePic'

const CommentIndex = () => {
   const history = useHistory();
   const { id } = useParams();
   const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
   const commentCount = comments ? (comments.length >= 1000 ? `${comments.length / 1000.0}K Comments` : `${comments.length} Comments`) : null; //will add reply count to this
   const [body, setBody] = useState("");
   const [ writingComment, setWritingComment ] = useState(false);
   const signedIn = useSelector(state => state.session.user ? true : false)
   const commenterId = useSelector(state => state.session.user?.id)
   const commenter = useSelector(state => state.session.user ? state.session.user : null)
   const commenterPic = commenter ? commenter.sessionUserPic : null;
   const commenterName = commenter ? commenter.firstName : null;
   const dispatch = useDispatch();
   const [errors, setErrors] = useState([]);
   const commenterIcon = signedIn ? <ProfilePic image={commenterPic} firstName={commenterName}/> : <i class="fa-solid fa-ghost"></i>;

   const handleSubmit = e => {
      e.preventDefault();
      setErrors([]);
      setWritingComment(false);
      dispatch(createComment({body, commenterId, videoId: id}))
      setBody("")
   }

   const handleClick = e => {
      e.preventDefault();
      if (!signedIn) {
         history.push("/login");
      } else {
         setWritingComment(true);
      }
   }

   const handleCancel = e => {
      e.preventDefault();
      setBody("");
      setWritingComment(false);
   }

   return (
      <div className="comment-index">
         <div className="comment-box">
            <div className="comment-index-info">
               <p className="comment-count">{commentCount}</p>
               <div className="comment-sort-button">
                  <i className="fa-solid fa-sliders"></i>
                  <p>Sort by</p>
               </div> {/* this will be changed */}
            </div>
            <div className="comment-form-container">
               <div className="commenter-icon-container">
                  {commenterIcon}
               </div>
               <input className="comment-input"
                      type="text"
                      placeholder="Add a comment..."
                      value={body}
                      onClick={e => handleClick(e)}
                      onChange={e => setBody(e.target.value)}>
               </input>
            </div>
            {writingComment && 
               <div className="comment-buttons">
                  <button className="cancel-button" onClick={e => handleCancel(e)}>Cancel</button>
                  <button className="submit-comment"
                          style={{
                           backgroundColor: body !== "" ? 'orange' : 'grey',
                           color: body !== "" ? '#1e1e1e' : 'rgb(121, 63, 5)',
                           cursor: body !== "" ? 'pointer' : 'default'
                         }}
                          disabled={ body !== "" ? false : true }
                          onClick={handleSubmit}>Comment
                  </button>
               </div>
            }
         </div>
         {comments.map(comment => <CommentIndexItem key={comment.id} comment={comment}/>)}
      </div>
   )
}

export default CommentIndex;