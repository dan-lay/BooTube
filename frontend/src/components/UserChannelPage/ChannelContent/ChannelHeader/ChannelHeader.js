import "./ChannelHeader.css"

const ChannelHeader = (props) => {
   const user = props.user;

   return (
      <div className="channel-header">
         <div className="profile-image-container">
            <div className="profile-image">

            </div>
         </div>
         <div className="header-info-container">

         </div>
      </div>
   )
}

export default ChannelHeader;