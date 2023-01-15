import './UserMastheadControls.css'
import { Link } from 'react-router-dom';
import uploadButton from '../../../assets/upload-video-icon.png'
import { useSelector } from 'react-redux';
import signinIcon from '../../../assets/booootube_signin_icon.png';
import linkedinIcon from '../../../assets/bootube_linkedin_bug.png';
import githubIcon from '../../../assets/booootube_github_icon.png';
import { ProfilePic } from '../../../utils/ProfPic/ProfilePic';
import { useState } from 'react';

const UserMastheadControls = (props) => {
   const currentUser = useSelector(state => state.session.user ? state.session.user : null);
   const sessionPic = currentUser ? currentUser.sessionUserPic : null;
   const firstName = currentUser ? currentUser.firstName : null;
   const dropdownOpen = props.dropdownOpen;
   const setDropdownOpen = props.setDropdownOpen;
   const setRevealUpload = props.setRevealUpload;
   const revealUpload = props.revealUpload;

   return (
      <div className="user-masthead-controls">
         {currentUser && 
            <div className="upload-button" onClick={() => setRevealUpload(revealUpload ? false : true)}>
               <img src={uploadButton}/>
            </div>
         }
         <div className="github-link-button">
            <a href='https://github.com/dan-lay/BooTube'>
               <img src={githubIcon}/>
            </a>
         </div>
         <div className='linkedin-button'>
            <a href='https://www.linkedin.com/in/dan-lay/'>
               <img src={linkedinIcon}/>
            </a>
         </div>
         {currentUser &&
            <div className="user-dropdown-button" onClick={() => setDropdownOpen(dropdownOpen ? false : true)}>
               {currentUser ? <ProfilePic image={sessionPic} firstName={firstName}/> : null}
            </div>
         }
         {!currentUser &&
            <div className="sign-in-button-container">
               <div className='sign-in-button-icon'>
                  <img src={signinIcon}></img>
               </div>
               <Link to="/login" className="sign-in-button">Sign in</Link>
            </div>
         }
      </div>
   )
}

export default UserMastheadControls;