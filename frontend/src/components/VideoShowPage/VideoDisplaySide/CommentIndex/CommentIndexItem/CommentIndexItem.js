import { useEffect, useState } from 'react';
import './CommentIndexItem.css'
import { useDispatch, useSelector} from 'react-redux';
import { deleteComment } from '../../../../../store/comments';
import CommentEditForm from './CommentEditForm/CommentEditForm';
import { formatUploadDate } from '../../../../../utils/dateFormatter';

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

   useEffect(() => {
      setUpdating(false)
   }, [comment])

   // const deleteButton = currentUser.id === comment.commenterId ? <button onClick={handleDelete}>DELETE</button> : null;

   // const updateButton = currentUser.id === comment.commenterId ? <button onClick={handleUpdate}>UPDATE</button> : null;

   // const updateForm = updating ? <CommentEditForm commentId={comment.id}/> : null;

   return (
      <div className='comment-index-item'>
         <div className='commenter-icon-container'>

         </div>
         <div className='comment-meat'>
            <div className='comment-upper'>
               <p className='commenter-name'></p>
               <p className='comment-date'>{comment ? formatUploadDate(comment.createdAt) : null}</p>
            </div>
            <p className='comment-body'>{comment.body}</p>
            <div className='comment-utils'>
               <div className='like-button'></div>
               <div className='like-counter'></div>
               <div className='dislike-button'></div>
               <div className='dislike-counter'></div>
               <div className='comment-reply-button'></div>
            </div>
         </div>
         
         {/* {deleteButton}
         {updateButton}
         {updateForm} */}

         
      </div>
   )
}

export default CommentIndexItem;