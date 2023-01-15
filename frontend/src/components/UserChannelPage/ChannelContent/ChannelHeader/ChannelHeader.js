import "./ChannelHeader.css"
import { ProfilePic } from "../../../../utils/ProfPic/ProfilePic";

const ChannelHeader = (props) => {
   const user = props.user;
   const image = user ? user.profileImage : null;
   const firstName = user ? user.firstName : null;
   const lastName = user ? user.lastName : null;
   const setRevealEditForm = props.setRevealEditForm;
   const userSubCount = user ? (user.subscribers.length === 0 ? "No" : user.subscribers.length) : null;

   const openModal = () => {
      console.log("click")
      setRevealEditForm(true)
   }

   return (
      <div className="channel-header">
         <div className="profile-image-container">
            {user ? <ProfilePic image={image} firstName={firstName} lastName={lastName}/> : null}
         </div>
         <div className="header-info-container">
            <div className="user-name">{`${firstName} ${lastName}`}</div>
            <div className="user-handle">{`${user ? user.handle : null}`}</div>
            <div className="user-prof-sub-count">{`${userSubCount} subscribers`}</div>
         </div>
         <div className="prof-manage-container">
            <div className="button" id="edit-profile" onClick={openModal}>
               Edit profile
            </div>
            <div className="button" id="manage-videos">
               Manage videos
            </div>
         </div>
      </div>
   )
}

export default ChannelHeader;