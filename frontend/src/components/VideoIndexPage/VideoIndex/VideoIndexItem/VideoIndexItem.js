import './VideoIndexItem.css';

const VideoIndexItem = (props) => {
   const video = props.video;

   return (
      <div className="video-index-item">
         {/* <video controls="controls autoplay">
            <source type="video/mp4" src={video.mediaObject}/>
         </video> */}
         <img className="thumbnail" src={video.thumbnail}></img>

      </div>
   )
}

export default VideoIndexItem;