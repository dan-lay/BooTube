import "./ChannelContent.css"
import ChannelHeader from "./ChannelHeader/ChannelHeader";
import ProfileVideoIndex from "./ProfileVideoIndex/ProfileVideoIndex";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import { useState } from "react";

const ChannelContent = (props) => {
   const user = props.user;
   const setRevealEditForm = props.setRevealEditForm;
   const [ manageMode, setManageMode ] = useState(false);
   
   return (
      <div className="channel-content">
         <ChannelHeader setManageMode={setManageMode} manageMode={manageMode} setRevealEditForm={setRevealEditForm} user={user}/>
         <ProfileNavBar />
         <ProfileVideoIndex manageMode={manageMode}/>

      </div>
   )
}

export default ChannelContent;