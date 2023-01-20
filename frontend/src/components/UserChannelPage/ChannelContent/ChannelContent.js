import "./ChannelContent.css"
import { useDispatch, useSelector } from "react-redux";
import ChannelHeader from "./ChannelHeader/ChannelHeader";
import ProfileVideoIndex from "./ProfileVideoIndex/ProfileVideoIndex";
import { deleteUser } from "../../../store/users";
import { logout } from "../../../store/session";
import { useHistory, useParams } from "react-router-dom";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";

const ChannelContent = (props) => {
   const user = props.user;
   const setRevealEditForm = props.setRevealEditForm;
   
   return (
      <div className="channel-content">
         <ChannelHeader setRevealEditForm={setRevealEditForm} user={user}/>
         <ProfileNavBar />
         <ProfileVideoIndex />

      </div>
   )
}

export default ChannelContent;