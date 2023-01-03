import "./VideoIndexPage.css"
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import CategoryBar from "./CategoryBar/CategoryBar";
import VideoIndex from "./VideoIndex/VideoIndex";
import UploadVideoModal from "../UploadVideoModal/UploadVideoModal";
import { useState } from "react";


const VideoIndexPage = () => {
   // const sessionUser = useSelector(state => state.session.user);
   const [ revealUpload, setRevealUpload ] = useState(false);

   return (
      <div className="video-index-page">
         <TopBar setRevealUpload={setRevealUpload} revealUpload={revealUpload}/>
         <CategoryBar />
         
         <VideoIndex />
         <Sidebar />
         {revealUpload && <UploadVideoModal />}
      </div>
   )
}

export default VideoIndexPage;