import { useDispatch, useSelector } from "react-redux";
import "./ChannelContent.css"
import ChannelHeader from "./ChannelHeader/ChannelHeader";
import ProfileVideoIndex from "./ProfileVideoIndex/ProfileVideoIndex";
import { deleteUser } from "../../../store/users";
import { logout } from "../../../store/session";
import { useHistory, useParams } from "react-router-dom";

const ChannelContent = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const user = props.user;

   const deleteAccount = async () => {
      await dispatch(logout())
      .then(dispatch(deleteUser(user.id)))
      .then(history.push("/"))
   }
   
   return (
      <div className="channel-content">
         <ChannelHeader user={user}/>
         <button onClick={deleteAccount}>delete user</button>
         <ProfileVideoIndex />

      </div>
   )
}

export default ChannelContent;