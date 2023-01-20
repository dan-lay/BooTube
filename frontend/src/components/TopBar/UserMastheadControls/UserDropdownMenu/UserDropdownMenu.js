import './UserDropdownMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../../../store/session";
import { useHistory } from 'react-router-dom';
import { ProfilePic } from '../../../../utils/ProfPic/ProfilePic'
import { useRef } from 'react';
import risingSignIcon from "../../../../assets/rising_sign_favicon.png"
import stepSeqIcon from '../../../../assets/stepSeq_favicon.gif'

const UserDropdownMenu = (props) => {
   const history = useHistory();
   const dispatch = useDispatch();
   const dropdown = useRef(null);
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null);
   const firstName = sessionUser ? sessionUser.firstName : null;
   const lastName = sessionUser ? sessionUser.lastName : null;
   const handle = sessionUser ? sessionUser.handle : null;
   const profilePic = sessionUser ? sessionUser.profileImage : null;
   const setRevealEditForm = props.setRevealEditForm;
   const setDropdownOpen = props.setDropdownOpen;

   const logoutClick = () => {
      setDropdownOpen(false);
      dispatch(sessionActions.logout());
   }

   const visitMyChannel = () => {
      setDropdownOpen(false)
      history.push(`/${sessionUser.handle}`)
   }

   const visitStepSeq = () => {
      if (window.confirm("This will take you to my other project stepSeq, are you sure you want to navigate away?")) {
         window.open('https://danlay.me/stepSeq/')
      }
   }

   const visitRisingSign = () => {
      if (window.confirm("This will take you to my team project Rising Sign, are you sure you want to navigate away?")) {
         window.open('https://rising-sign.onrender.com/')
      }
   }

   const editProfile = () => {
      setRevealEditForm(true)
   }

   return (
      <div className='user-dropdown-menu' ref={dropdown}>
         <div className='dropdown-header'>
            <div className='dropdown-header-left'>
               <div className='dropdown-pic-container'>
                  {sessionUser && <ProfilePic image={profilePic} firstName={firstName}/>}
               </div>
            </div>
            <div className='dropdown-header-right'>
               <div className='dropdown-name-container'>{`${firstName} ${lastName}`}</div>
               <div className='dropdown-handle-container'>{handle}</div>
               <div className='dropdown-edit-account-button' onClick={editProfile}>Manage your Boogle Account</div>
            </div>

         </div>
         <div className='dropdown-bottom'>
            <div className='dropdown-menu-button' id='your-channel' onClick={visitMyChannel}>
               <p>Your channel</p>
            </div>
            <div className='dropdown-menu-button' id='stepseq' onClick={visitStepSeq}>
               <p>stepSeq</p>
               <img src={stepSeqIcon}/>
            </div>
            <div className='dropdown-menu-button' id='rising-sign' onClick={visitRisingSign}>
               <p>Rising Sign</p>
               <img src={risingSignIcon}/>
            </div>
            <div className='dropdown-menu-button' id='signout' onClick={logoutClick}>
               <p>Sign out</p>
            </div>
         </div>
      </div>
   )
}

export default UserDropdownMenu;