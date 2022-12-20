import { useEffect, useState } from 'react';
import './CommentIndexItem.css'
import { useDispatch, useSelector} from 'react-redux';
import { deleteComment } from '../../../../../store/comments';
import CommentEditForm from './CommentEditForm/CommentEditForm';
import { formatUploadDate } from '../../../../../utils/dateFormatter';

const CommentIndexItem = (props) => {
   const comment = props.comment;
   const commenterId = comment ? comment.commenterId : null;
   const commenterName = comment ? comment.commenterName : null; //change to username later
   const commentDate = comment ? formatUploadDate(comment.createdAt) : null;
   console.log(commenterId)
   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.session ? state.session.user : null)
   const [updating, setUpdating] = useState(false)
   const [commentOptions, setCommentOptions] = useState(false)

   const handleDelete = () => {
      setCommentOptions(false);
      dispatch(deleteComment(comment.id));
   }

   const handleUpdate = () => {
      setUpdating(true);
   }

   const openCommentOptions = () => {
      setCommentOptions(true)
   }

   useEffect(() => {
      setUpdating(false)
   }, [comment])

   const updateForm = updating ? <CommentEditForm commentId={comment.id}/> : null;
   
   return (
      <div className='comment-index-item'>
         <div className='commenter-icon-container'>

         </div>
         <div className='comment-meat'>
            {/* <div className='comment-upper'>
               <p className='commenter-name'>{commenterName}</p>
               <p className='comment-date'>{commentDate}</p>
            </div>
            <p className='comment-body'>{comment.body}</p>
            <div className='comment-utils'>
               <div className='like-button'></div>
               <div className='like-counter'></div>
               <div className='dislike-button'></div>
               <div className='dislike-counter'></div>
               <div className='comment-reply-button'></div>
            </div> */}
         </div>
         {currentUser.id === comment.commenterId &&
            <div className='comment-edit-button' onClick={openCommentOptions}> 
               <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
         }
         {commentOptions && 
            <div className='comment-options'>
               <div className='edit-comment-button'>
                  <i className="fa-solid fa-pencil"></i>
                  <p>Edit</p>
               </div>
               <div className='delete-comment-button' onClick={handleDelete}>
                  <i className="fa-solid fa-trash-can"></i>
                  <p>Delete</p>
               </div>
            </div>
         }
         {/* {updateForm} */}

         
      </div>
   )
}

export default CommentIndexItem;