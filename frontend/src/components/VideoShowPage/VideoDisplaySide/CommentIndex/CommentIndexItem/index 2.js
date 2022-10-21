import { useEffect, useState } from 'react';
import './CommentIndexItem.css'
import { useDispatch, useSelector} from 'react-redux';
import { deleteComment } from '../../../../../store/comments';
import CommentEditForm from './CommentEditForm';

const CommentIndexItem = (props) => {
   const comment = props.comment;
   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.session.user)
   const [updating, setUpdating] = useState(false)

   const handleDelete = () => {
      dispatch(deleteComment(comment.id))
   }

   const handleUpdate = () => {
      return setUpdating(true)
   }

   const deleteButton = currentUser.id === comment.commenterId ? <button onClick={handleDelete}>DELETE</button> : null;

   const updateButton = currentUser.id === comment.commenterId ? <button onClick={handleUpdate}>UPDATE</button> : null;

   const updateForm = updating ? <CommentEditForm commentId={comment.id}/> : null;

   // useEffect(() => {
    
   // }, [])
   

   return (
      <div className='comment-index-item'>
         <h2>{comment.body}</h2>
         {deleteButton}
         {updateButton}
         {updateForm}

         
      </div>
   )
}

export default CommentIndexItem;