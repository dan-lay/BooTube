import "./UserChannelPage.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../store/users";
import { useDispatch } from "react-redux";
import Sidebar from "../VideoIndexPage/Sidebar/Sidebar";
import ChannelContent from "./ChannelContent/ChannelContent";

const UserChannelPage = (props) => {
   const dispatch = useDispatch();
   const { handle } = useParams();
   const setRevealEditForm = props.setRevealEditForm;
   const sessionUsername = useSelector(state => state.session.user ? state.session.user.handle : null)
   const user = useSelector(state => state.users ? Object.values(state.users)[0] : null)

   let myProfile;

   handle !== sessionUsername ? myProfile = false : myProfile = true; //when you add @ need to add logic here to consider that

   useEffect(() => {
      dispatch(getUser(handle))
   }, [handle])

   

   return (
      <div className="user-channel-page">
         <Sidebar/>
         <ChannelContent setRevealEditForm={setRevealEditForm} user={user}/>
      </div>
   )
}

export default UserChannelPage;