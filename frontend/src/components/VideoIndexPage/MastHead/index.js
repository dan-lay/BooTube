import './MastHead.css'
import homelogo from "../../../assets/booootube_logo_v2.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import * as sessionActions from "../../../store/session";
import hamburger from '../../../assets/hamburger.png'
import UserMastheadControls from './UserMastheadControls';
import SignInButton from './SignInButton';
import { Redirect } from 'react-router-dom';

const MastHead = () => {
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user);
   // const logoutButton = sessionUser ? <button className="temp-log-out" onClick={logoutClick}>Log Out</button> : null;

   const logoutClick = () => {
      dispatch(sessionActions.logout());
   }

   const rightMastheadControls = sessionUser ? <UserMastheadControls /> : <SignInButton />;



   return (
      <div className="masthead">
         <div className='left-masthead'>
            <div className='side-modal-button'>
               <img alt="hmbrgr" src={hamburger} sizes="24x24"/>

            </div>
            <Link className="home-button" to="/">
               <img src={homelogo} alt="HOME" sizes="120x56"/>
            </Link>
         </div>
         <div className='mid-masthead'>
            {sessionUser && <button className="temp-log-out" onClick={logoutClick}>Log Out</button>}
            <div className='search-bar-outer'>
               <form>
                  <div className='search-bar-input'>

                  </div>
                  <div className='search-button'>

                  </div>
               </form>
               <div className='microphone-button'>

               </div>
            </div>
         </div>
         <div className='right-masthead'>
            {rightMastheadControls}
         </div>

         
      </div>
   )
}

export default MastHead;