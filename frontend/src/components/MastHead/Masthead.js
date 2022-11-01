import './MastHead.css';
import homelogo from "../../assets/booootube_logo_v2.png";
import magGlass from "../../assets/booootube-mag-glass.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import * as sessionActions from "../../store/session";
import hamburger from '../../assets/hamburger_2.png';
import UserMastheadControls from './UserMastheadControls';
import { Redirect } from 'react-router-dom';
import micIcon from '../../assets/booootube_mic_icon.png';
import { useState } from 'react';

const MastHead = () => {
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user);
   const [ search, setSearch ] = useState("")
   // const logoutButton = sessionUser ? <button className="temp-log-out" onClick={logoutClick}>Log Out</button> : null;

   const logoutClick = () => {
      dispatch(sessionActions.logout());
   }

   const handleSubmit = e => {

   }



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
               <form className='search-bar-form' id="search-bar-form" onSubmit={handleSubmit}>
                  <input type="text" className='search-bar-input' placeholder="Search">

                  </input>
               </form>
               <div className='search-button'>
                  <input className='search-button-input' type="submit" value={search} form="search-bar-form"></input>
                  <img src={magGlass}></img>
               </div>
               
            </div>
            <div className='microphone-button'>
               <img src={micIcon}></img>
            </div>
         </div>
         <div className='right-masthead'>
            <UserMastheadControls />
         </div>

         
      </div>
   )
}

export default MastHead;