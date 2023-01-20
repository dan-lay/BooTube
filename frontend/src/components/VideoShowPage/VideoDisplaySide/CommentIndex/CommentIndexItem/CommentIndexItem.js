import { useEffect, useState } from 'react';
import './CommentIndexItem.css'
import { useDispatch, useSelector} from 'react-redux';
import { deleteComment } from '../../../../../store/comments';
import CommentEditForm from './CommentEditForm/CommentEditForm';
import { formatUploadDate } from '../../../../../utils/_dateFormatter';
import { formatLikeCount } from '../../../../../utils/likeCountFormatter';
import { ProfilePic } from '../../../../../utils/ProfPic/ProfilePic';
import OutsideAlerter from '../../../../../utils/_outsideClickDetector';
import { useHistory } from 'react-router-dom';

const CommentIndexItem = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const currentUser = useSelector(state => state.session.user);
   const comment = props.comment;
   const commenterId = comment ? comment.commenterId : null;
   const commenterName = comment ? comment.commenterName : null;
   const commenterHandle = comment ? comment.commenterHandle : null; //change to username later
   const commentDate = comment ? formatUploadDate(comment.createdAt) : null;
   const commentIcon = comment ? comment.commenterIcon : null;
   const currentUserId = currentUser ? currentUser.id : null;
   const [editing, setEditing] = useState(false)
   const [openCommentOptions, setOpenCommentOptions] = useState(false)

   const handleEdit = () => {
      setOpenCommentOptions(false);
      setEditing(true);
   }

   const handleDelete = () => {
      setOpenCommentOptions(false);
      dispatch(deleteComment(comment.id));
   }

   const visitProfile = () => {
      history.push(`/${commenterHandle}`)
   }

   const likeComment = () => {
      
   }

   const dislikeComment = () => {

   }

   useEffect(() => {
      setEditing(false)  
   }, [comment])

   const commentOptions = <div className='comment-options'>
                              <div className='edit-comment-button' onClick={handleEdit}>
                                 <i className="fa-solid fa-pencil"></i>
                                 <p>Edit</p>
                              </div>
                              <div className='delete-comment-button' onClick={handleDelete}>
                                 <i className="fa-solid fa-trash-can"></i>
                                 <p>Delete</p>
                              </div>
                           </div>
   

   return (
      <div className='comment-index-item'>
         <div className='commenter-icon-container' onClick={visitProfile}>
            <ProfilePic image={commentIcon} firstName={commenterName}/>
         </div>
         <div className='comment-meat'>
            { editing && <CommentEditForm setEditing={setEditing} commentId={comment.id}/> }

            { !editing && <><div className='comment-upper'>
               <p className='commenter-handle' onClick={visitProfile}>{commenterHandle}</p>
               <p className='comment-date'>{commentDate}</p>
            </div>
            <p className='comment-body'>{comment.body}</p>
            <div className='comment-utils'>
               <div className='button' id='like-button' onClick={likeComment}>
                  <i className='fa-regular fa-thumbs-up'></i>
                  <p>{comment ? formatLikeCount(comment.likes) : null}</p>
               </div>
               <div className='button' id='dislike-button' onClick={dislikeComment}>
                  <i className='fa-regular fa-thumbs-down'></i>
                  <p>{comment ? formatLikeCount(comment.dislikes) : null}</p>
               </div>
               <div className='comment-reply-button'></div>
            </div></>}
         </div>
         {currentUserId === commenterId && !editing &&
            <div className='comment-edit-button' data-open={openCommentOptions} onClick={() => setOpenCommentOptions(true)}> 
               <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
         }
         {openCommentOptions && 
            <OutsideAlerter children={commentOptions} unfocus={() => setOpenCommentOptions(false)}/>
         }
         
      </div>
   )
}

export default CommentIndexItem;