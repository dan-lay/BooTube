import "./ChannelContent.css"
import ChannelHeader from "./ChannelHeader/ChannelHeader";
import ProfileVideoIndex from "./ProfileVideoIndex/ProfileVideoIndex";

const ChannelContent = () => {
   
   return (
      <div className="channel-content">
         <ChannelHeader />
         <ProfileVideoIndex />

      </div>
   )
}

export default ChannelContent;