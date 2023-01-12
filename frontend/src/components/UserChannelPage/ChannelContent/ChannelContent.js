import { useDispatch } from "react-redux";
import "./ChannelContent.css"
import ChannelHeader from "./ChannelHeader/ChannelHeader";
import ProfileVideoIndex from "./ProfileVideoIndex/ProfileVideoIndex";
import { deleteUser } from "../../../store/users";
import { useHistory } from "react-router-dom";

const ChannelContent = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const user = props.user

   const deleteAccount = async () => {
      await dispatch(deleteUser(user.handle))
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