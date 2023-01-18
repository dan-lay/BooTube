import './UserDropdownMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../../../store/session";
import { useHistory } from 'react-router-dom';
import { ProfilePic } from '../../../../utils/ProfPic/ProfilePic'
import { useEffect } from 'react';
import { useRef } from 'react';

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

   let perimeter;
   let leftBound;
   let rightBound;
   let topBound;
   let bottomBound;

   function findNewTarget(e) {
      const newPerimeter = e.target.getBoundingClientRect();
      const newLeft = newPerimeter.left
      const newRight = newPerimeter.right
      const newTop = newPerimeter.top
      const newBottom = newPerimeter.bottom

      console.log(newLeft)

      if (newLeft < leftBound || newRight > rightBound || newTop < topBound || newBottom > bottomBound) {
         dropdown.current = null;
         console.log(document)
         document.removeEventListener("click", findNewTarget)
         setDropdownOpen(false)
      }
   }

   useEffect(() => {
      dropdown.current.focus()
      perimeter = dropdown.current.getBoundingClientRect()
      leftBound = perimeter.left;
      rightBound = perimeter.right;
      topBound = perimeter.top;
      bottomBound = perimeter.bottom;
      document.addEventListener("mousedown", e => findNewTarget(e))
      return document.removeEventListener("click", findNewTarget)
   }, [])

   const logoutClick = () => {
      setDropdownOpen(false);
      dispatch(sessionActions.logout());
   }

   const visitMyChannel = () => {
      setDropdownOpen(false)
      history.push(`/${sessionUser.handle}`)
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
            <div className='dropdown-menu-button' id='something'>
               <p>something</p>
            </div>
            <div className='dropdown-menu-button' id='something'>
               <p>something</p>
            </div>
            <div className='dropdown-menu-button' id='signout' onClick={logoutClick}>
               <p>Sign out</p>
            </div>
         </div>
      </div>
   )
}

export default UserDropdownMenu;