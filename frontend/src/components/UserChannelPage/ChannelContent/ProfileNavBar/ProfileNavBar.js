import "./ProfileNavBar.css"

const ProfileNavBar = () => {
   return (
      <div className="profile-nav-bar">
         <div className="prof-nav-button" id="home">
            HOME
         </div>
         <div className="prof-nav-button" id="playlists">
            PLAYLISTS
         </div>
         <div className="prof-nav-button" id="channels">
            CHANNELS
         </div>
         <div className="prof-nav-button" id="about">
            ABOUT
         </div>

      </div>
   )
}

export default ProfileNavBar;