import "./ChannelHeader.css"

const ChannelHeader = (props) => {
   const user = props.user;
   const setRevealEditForm = props.setRevealEditForm;

   const openModal = () => {
      console.log("click")
      setRevealEditForm(true)
   }

   return (
      <div className="channel-header">
         <div className="profile-image-container">
            <div className="profile-image">

            </div>
         </div>
         <div className="header-info-container">
            <div className="user-name">{user ? `${user.firstName} ${user.lastName}` : null}</div>
            <div className="user-handle">{`${user ? user.handle : null}`}</div>
            <div className="user-prof-sub-count"># of Subscribers</div>
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