import "./ChannelHeader.css"

const ChannelHeader = (props) => {
   const user = props.user;
   console.log(user)

   return (
      <div className="channel-header">
         <div className="profile-image-container">
            <div className="profile-image">

            </div>
         </div>
         <div className="header-info-container">
            {`${user ? user.handle : null}`}
         </div>
      </div>
   )
}

export default ChannelHeader;