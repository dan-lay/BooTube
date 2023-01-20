import { useSelector } from "react-redux"
import "./ProfileNavBar.css"
import { useHistory } from "react-router-dom";

const ProfileNavBar = () => {
   const history = useHistory();
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null)
   const myHandle = sessionUser ? sessionUser.handle : null;

   const myPlaylists = () => {
      window.alert("Playlists coming soon!")
   }

   const myChannels = () => {
      window.alert("Channel view coming soon!")
   }

   const myAboutMe = () => {
      window.alert("About me coming soon!")
   }

   return (
      <div className="profile-nav-bar">
         <div className="prof-nav-button" id="home" onClick={() => history.push(`/${myHandle}`)}>
            HOME
         </div>
         <div className="prof-nav-button" id="playlists" onClick={myPlaylists}>
            PLAYLISTS
         </div>
         <div className="prof-nav-button" id="channels" onClick={myChannels}>
            CHANNELS
         </div>
         <div className="prof-nav-button" id="about" onClick={myAboutMe}>
            ABOUT
         </div>

      </div>
   )
}

export default ProfileNavBar;