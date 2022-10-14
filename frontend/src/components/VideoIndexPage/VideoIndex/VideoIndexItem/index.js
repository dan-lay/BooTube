import './VideoIndexItem.css';

const VideoIndexItem = (props) => {
   const video = props.video;
   console.log(video)

   return (
      <div className="video-index-item">
         <video width="400px" controls="controls autoplay">
            <source type="video/mp4" src={video.mediaObject}/>
         </video>
         <p>yo yo</p>

      </div>
   )
}

export default VideoIndexItem;