import "./VideoIndexContent.css"
import VideoIndex from "./VideoIndex/VideoIndex";
import CategoryBar from "./CategoryBar/CategoryBar";

const VideoIndexContent = () => {
   return (
      <div className="video-index-content">
         {/* <CategoryBar /> */}
         <VideoIndex />
      </div>
   )
}

export default VideoIndexContent;