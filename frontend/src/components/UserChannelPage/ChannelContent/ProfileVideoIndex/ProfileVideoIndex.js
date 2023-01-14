import { useDispatch, useSelector } from "react-redux";
import "./ProfileVideoIndex.css"
import VideoIndexItem from "../../../VideoIndexPage/VideoIndexContent/VideoIndex/VideoIndexItem/VideoIndexItem";
import { deleteVideo } from "../../../../store/videos";

const ProfileVideoIndex = () => {
   const dispatch = useDispatch();
   const videos = useSelector(state => state.videos)
   const videoArr = videos ? Object.values(videos) : [];

   const handleDelete = (e, videoId) => {
      console.log(videoId)
      dispatch(deleteVideo(videoId))
   }

   return (
      <div className="profile-video-index">
         {videoArr.map(video => <div key={video.id}><div key={`delete_button_${video.id}`} className="delete-vid-button" onClick={e => handleDelete(e, video.id)}>delete</div><VideoIndexItem key={`profile_video_${video.id}`} video={video}/></div>)}
      </div>
   )
}

export default ProfileVideoIndex;