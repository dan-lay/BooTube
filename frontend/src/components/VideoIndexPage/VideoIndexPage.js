import "./VideoIndexPage.css"
import CategoryBar from "./CategoryBar/CategoryBar";
import VideoIndex from "./VideoIndex/VideoIndex";


const VideoIndexPage = () => {

   return (
      <div className="video-index-page">
         <CategoryBar />
         
         <VideoIndex />
      </div>
   )
}

export default VideoIndexPage;