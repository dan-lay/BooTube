import "./VideoIndexPage.css"
import Sidebar from "./Sidebar/Sidebar";
import CategoryBar from "./CategoryBar/CategoryBar";
import VideoIndex from "./VideoIndex/VideoIndex";


const VideoIndexPage = () => {

   return (
      <div className="video-index-page">
         <CategoryBar />
         <VideoIndex />
         <Sidebar />
      </div>
   )
}

export default VideoIndexPage;