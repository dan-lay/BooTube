import { useDispatch, useSelector } from "react-redux";
import "./ChannelContent.css"
import ChannelHeader from "./ChannelHeader/ChannelHeader";
import ProfileVideoIndex from "./ProfileVideoIndex/ProfileVideoIndex";
import { deleteUser } from "../../../store/users";
import { logout } from "../../../store/session";
import { useHistory, useParams } from "react-router-dom";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";

const ChannelContent = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const user = props.user;
   const setRevealEditForm = props.setRevealEditForm;

   const deleteAccount = async () => {
      await dispatch(logout())
      .then(dispatch(deleteUser(user.id)))
      .then(history.push("/"))
   }
   
   return (
      <div className="channel-content">
         <ChannelHeader setRevealEditForm={setRevealEditForm} user={user}/>
         <ProfileNavBar />
         <button onClick={deleteAccount}>delete user</button>
         <ProfileVideoIndex />

      </div>
   )
}

export default ChannelContent;