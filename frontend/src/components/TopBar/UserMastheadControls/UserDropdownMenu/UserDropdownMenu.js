import './UserDropdownMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../../../store/session";
import { useHistory } from 'react-router-dom';

const UserDropdownMenu = (props) => {
   const history = useHistory();
   const dispatch = useDispatch();
   const setRevealEditForm = props.setRevealEditForm;
   const setDropdownOpen = props.setDropdownOpen;
   const sessionUser = useSelector(state => state.session.user);


   const logoutClick = () => {
      setDropdownOpen(false);
      dispatch(sessionActions.logout());
   }

   const visitMyChannel = () => {
      setDropdownOpen(false)
      history.push(sessionUser.handle)
   }

   return (
      <div className='user-dropdown-menu'>
         <div className='dropdown-header'>

         </div>
         <button onClick={visitMyChannel}>your channel</button>
         {sessionUser && <button className="temp-log-out" onClick={logoutClick}>Log Out</button>}

      </div>
   )
}

export default UserDropdownMenu;