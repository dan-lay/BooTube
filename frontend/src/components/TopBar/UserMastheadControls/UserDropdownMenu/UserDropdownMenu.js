import './UserDropdownMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../../../store/session";

const UserDropdownMenu = (props) => {
   const dispatch = useDispatch();
   const setDropdownOpen = props.setDropdownOpen;
   const sessionUser = useSelector(state => state.session.user);


   const logoutClick = () => {
      setDropdownOpen(false);
      dispatch(sessionActions.logout());
   }

   return (
      <div className='user-dropdown-menu'>
         <div className='dropdown-header'>

         </div>
         {sessionUser && <button className="temp-log-out" onClick={logoutClick}>Log Out</button>}

      </div>
   )
}

export default UserDropdownMenu;