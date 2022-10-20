import './CommentIndexItem.css'

const CommentIndexItem = (props) => {
   const comment = props.comment;
   

   return (
      <div className='comment-index-item'>
         <h2>{comment.body}</h2>
      </div>
   )
}

export default CommentIndexItem;