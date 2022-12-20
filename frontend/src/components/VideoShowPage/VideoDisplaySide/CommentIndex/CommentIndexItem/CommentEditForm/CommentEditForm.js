import './CommentEditForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../../../../../store/comments';
import { useState } from 'react';

const CommentEditForm = (props) => {
   const commentId = props.commentId;
   const comment = useSelector(state => state.comments ? state.comments[commentId] : null);
   const [edit, setEdit] = useState("");
   const dispatch = useDispatch();
   

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateComment({id: commentId, body: edit}))
   }

   return (
      <div className="comment-form-container">
         <input className="comment-input"
                htmlFor="comment-form"
                type="text"
                placeholder="Add a comment..."
                onChange={e => setEdit(e.target.value)}>
         </input>
      </div>
      // <form className='comment-edit-form' onSubmit={handleSubmit}>
      //    <input type="text" }></input>
      //    <button type="submit">Edit</button>
      // </form>
   )

}

export default CommentEditForm;