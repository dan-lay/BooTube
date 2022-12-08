import "./VideoIndexPage.css"
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import MastHead from "../MastHead/MastHead";
// import MastHead from "/Users/dan/Code/bootube/frontend/src/components/MastHead/MastHead.js";
import CategoryBar from "./CategoryBar/CategoryBar";
import VideoIndex from "./VideoIndex/VideoIndex";


const VideoIndexPage = () => {

   const sessionUser = useSelector(state => state.session.user);

   // if (!sessionUser) return <Redirect to="/login"/>;

   return (
      <div className="video-index-page">
         {/* <MastHead /> */}
         <CategoryBar />
         <VideoIndex />
         <Sidebar />
      </div>
   )
}

export default VideoIndexPage;