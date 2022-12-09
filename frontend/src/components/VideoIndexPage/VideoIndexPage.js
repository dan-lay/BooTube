import "./VideoIndexPage.css"
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import CategoryBar from "./CategoryBar/CategoryBar";
import VideoIndex from "./VideoIndex/VideoIndex";


const VideoIndexPage = () => {

   const sessionUser = useSelector(state => state.session.user);

   // if (!sessionUser) return <Redirect to="/login"/>;

   return (
      <div className="video-index-page">
         <TopBar />
         <CategoryBar />
         
         <VideoIndex />
         <Sidebar />
      </div>
   )
}

export default VideoIndexPage;