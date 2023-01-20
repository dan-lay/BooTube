import "./VideoIndexPage.css"
import Sidebar from "../Sidebar/Sidebar";
import VideoIndexContent from "./VideoIndexContent/VideoIndexContent";


const VideoIndexPage = (props) => {
   const sidebarSize = props.sidebarSize;

   return (
      <div className="video-index-page">
         <Sidebar sidebarSize={sidebarSize}/>
         <VideoIndexContent />
      </div>
   )
}

export default VideoIndexPage;