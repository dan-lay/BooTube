import "./UserChannelPage.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../store/users";
import { useDispatch } from "react-redux";
import ChannelContent from "./ChannelContent/ChannelContent.js";

const UserChannelPage = () => {
   const dispatch = useDispatch();
   const { handle } = useParams();
   const sessionUsername = useSelector(state => state.session.user ? state.session.user.handle : null)

   useEffect(() => {
      dispatch(getUser(handle))
   }, [])

   let myProfile;

   handle !== sessionUsername ? myProfile = false : myProfile = true;

   return (
      <div className="user-channel-page">
         <ChannelContent />
         welcome to {handle}'s page
      </div>
   )
}

export default UserChannelPage;