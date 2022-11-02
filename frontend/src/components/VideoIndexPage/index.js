import "./VideoIndexPage.css"
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MastHead from "../MastHead/Masthead";
import CategoryBar from "./CategoryBar";
import VideoIndex from "./VideoIndex";


const VideoIndexPage = () => {

   const sessionUser = useSelector(state => state.session.user);

   // if (!sessionUser) return <Redirect to="/login"/>;

   return (
      <div className="video-index-page">
         <CategoryBar />
         <VideoIndex />
         <Sidebar />
      </div>
   )
}

export default VideoIndexPage;