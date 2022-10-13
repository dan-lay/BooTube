import "./VideoIndexPage.css"
import RightVideoIndexPage from "./RightVideoIndexPage";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


const VideoIndexPage = () => {

   const sessionUser = useSelector(state => state.session.user);

   if (!sessionUser) return <Redirect to="/login"/>;

   return (
      <div className="video-index-page">
         <Sidebar />
         <RightVideoIndexPage />
      </div>
   )
}

export default VideoIndexPage;