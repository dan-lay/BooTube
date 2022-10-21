import './CommentEditForm.css';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../../../../../store/comments';
import { useState } from 'react';

const CommentEditForm = (props) => {
   const [edit, setEdit] = useState("");
   const dispatch = useDispatch();
   const commentId = props.commentId;

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateComment({id: commentId, body: edit}))
   }

   return (
      <form className='comment-edit-form' onSubmit={handleSubmit}>
         <input type="text" onChange={e => setEdit(e.target.value)}></input>
         <button type="submit">Edit</button>
      </form>
   )

}

export default CommentEditForm;