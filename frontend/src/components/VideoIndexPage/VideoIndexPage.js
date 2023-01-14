import "./VideoIndexPage.css"
import Sidebar from "../Sidebar/Sidebar";
import VideoIndexContent from "./VideoIndexContent/VideoIndexContent";


const VideoIndexPage = () => {

   return (
      <div className="video-index-page">
         <Sidebar />
         <VideoIndexContent />
      </div>
   )
}

export default VideoIndexPage;