import './TopBar.css';
import homelogo from "../../assets/booootube_logo_v2.png";
import magGlass from "../../assets/booootube-mag-glass.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import hamburger from '../../assets/hamburger_2.png';
import UserMastheadControls from './UserMastheadControls/UserMastheadControls';
import { Redirect } from 'react-router-dom';
import micIcon from '../../assets/booootube_mic_icon.png';
import { useState } from 'react';
import UserDropdownMenu from './UserMastheadControls/UserDropdownMenu/UserDropdownMenu';

const TopBar = (props) => {
   const setRevealUpload = props.setRevealUpload;
   const revealUpload = props.revealUpload;
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null);
   const [ search, setSearch ] = useState("");
   const [ dropdownOpen, setDropdownOpen ] = useState(false);

   const handleSubmit = () => {

   }

   return (
      <>
      <div className="topbar">
         <div className='left-masthead'>
            <div className='side-modal-button'>
               <img alt="hmbrgr" src={hamburger}/>

            </div>
            <Link className="home-button" to="/">
               <img src={homelogo} alt="HOME" sizes="120x56"/>
            </Link>
         </div>
         <div className='mid-masthead'>
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
            <UserMastheadControls revealUpload={revealUpload} setRevealUpload={setRevealUpload} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}/>
         </div>

      </div>
      {dropdownOpen && <UserDropdownMenu setDropdownOpen={setDropdownOpen} />}
      </>
   )
}

export default TopBar;