import './CommentEditForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../../../../../store/comments';
import { useRef, useState } from 'react';

const CommentEditForm = (props) => {
   const setEditing = props.setEditing;
   const commentId = props.commentId;
   const comment = useSelector(state => state.comments ? state.comments[commentId].body : null);
   const [edit, setEdit] = useState(comment);
   const dispatch = useDispatch();
   const oldComment = useRef(comment);

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateComment({id: commentId, body: edit}))
   }

   const handleCancel = () => {
      setEditing(false);
   }

   return (
      <div className='comment-edit-form'>
         <div className="comment-form-container">
            <input className="comment-input"
                  type="text"
                  value={edit}
                  onChange={e => setEdit(e.target.value)}>
            </input>
         </div>
         <div className="comment-buttons">
            <button className="cancel-button" onClick={e => handleCancel(e)}>Cancel</button>
            <button className="submit-comment"
                  style={{
                     backgroundColor: oldComment.current !== edit ? 'orange' : 'grey',
                     color: oldComment.current !== edit ? '#1e1e1e' : 'rgb(121, 63, 5)',
                     disabled: oldComment.current !== edit ? 'false' : 'true',
                     cursor: oldComment.current !== edit ? 'pointer' : 'default'
                  }} 
                  onClick={handleSubmit}>Save
            </button>
         </div>
      </div>
   )

}

export default CommentEditForm;