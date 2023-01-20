import "./ChannelHeader.css"
import { ProfilePic } from "../../../../utils/ProfPic/ProfilePic";
import { useSelector } from "react-redux";

const ChannelHeader = (props) => {
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null)
   const sessionUserId = sessionUser ? sessionUser.id : null;
   const user = props.user;
   const userId = user ? user.id : null;
   const image = user ? user.profileImage : null;
   const firstName = user ? user.firstName : null;
   const lastName = user ? user.lastName : null;
   const setRevealEditForm = props.setRevealEditForm;
   const userSubCount = user ? (user.subCount === 0 ? "No" : user.subCount) : null;
   const manageMode = props.manageMode;
   const setManageMode = props.setManageMode;

   const openModal = () => {
      setRevealEditForm(true)
   }

   const subscribe = () => {

   }

   return (
      <div className="channel-header">
         <div className="channel-header-left">
            <div className="profile-image-container">
               {user ? <ProfilePic image={image} firstName={firstName}/> : null}
            </div>
            <div className="header-info-container">
               <div className="user-name">{`${firstName} ${lastName}`}</div>
               <div className="user-handle">{`${user ? user.handle : null}`}</div>
               <div className="user-prof-sub-count">{`${userSubCount} subscribers`}</div>
            </div>
         </div>
         <div className="prof-manage-container">
            {(sessionUser !== null && sessionUserId === userId) ?
               <>
               {!manageMode && <div className="button" id="edit-profile" onClick={openModal}>
                  Edit profile
               </div>}
               <div className="button" data-manage-mode={manageMode} id="manage-videos" onClick={() => setManageMode(manageMode ? false : true)}>
                  {manageMode ? "Done" : "Manage videos"}
               </div>
               </>
               :
               <>
               <div className="button" id="subsscribe" onClick={subscribe}>
                  Subscribe
               </div>
               </>
            }
         </div>
      </div>
   )
}

export default ChannelHeader;