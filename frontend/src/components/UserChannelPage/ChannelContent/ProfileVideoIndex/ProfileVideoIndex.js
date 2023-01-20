import { useDispatch, useSelector } from "react-redux";
import "./ProfileVideoIndex.css"
import VideoIndexItem from "../../../VideoIndexPage/VideoIndexContent/VideoIndex/VideoIndexItem/VideoIndexItem";
import { deleteVideo } from "../../../../store/videos";

const ProfileVideoIndex = (props) => {
   const manageMode = props.manageMode;
   const dispatch = useDispatch();
   const videos = useSelector(state => state.videos)
   const videoArr = videos ? Object.values(videos) : [];

   const handleDelete = videoId => {
      dispatch(deleteVideo(videoId))
   }

   return (
      <div className="profile-video-index">
         {videoArr.map(video => <div className="profile-vid-index-item" key={video.id}>
                                    <i className='fa-solid fa-trash-can'
                                       id="delete-vid-button"
                                       data-manage-mode={manageMode}
                                       key={`delete_button_${video.id}`}
                                       onClick={() => handleDelete(video.id)}>   
                                    </i>
                                    <VideoIndexItem key={`profile_video_${video.id}`} video={video}/>
                                 </div>)}
      </div>
   )
}

export default ProfileVideoIndex;