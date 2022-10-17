import './UserMastheadControls.css'
import uploadButton from '../../../../assets/upload-video-icon.svg'

const UserMastheadControls = () => {

   return (
      <div className="user-masthead-controls">
         <div className="upload-button">
            <img src={uploadButton}/>
         </div>
         <div className="github-link-button">

         </div>
         <div className="user-dropdown-button">

         </div>
      </div>
   )
}

export default UserMastheadControls;