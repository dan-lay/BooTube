import './TopBar.css';
import homelogo from "../../assets/booootube_logo_v2.png";
import magGlass from "../../assets/booootube-mag-glass.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import hamburger from '../../assets/hamburger_2.png';
import UserMastheadControls from './UserMastheadControls/UserMastheadControls';
import micIcon from '../../assets/booootube_mic_icon.png';
import { useState } from 'react';
import UserDropdownMenu from './UserMastheadControls/UserDropdownMenu/UserDropdownMenu';
import OutsideAlerter from '../../utils/_outsideClickDetector';

const TopBar = (props) => {
   const setSidebarSize = props.setSidebarSize;
   const sidebarSize = props.sidebarSize;
   const setRevealUpload = props.setRevealUpload;
   const revealUpload = props.revealUpload;
   const setRevealEditForm = props.setRevealEditForm;
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null);
   const [ search, setSearch ] = useState("");
   const [ dropdownOpen, setDropdownOpen ] = useState(false);
   

   const toggleSidebar = () => {
      if (sidebarSize === "max") {
         return setSidebarSize("min")
      } else {
         return setSidebarSize("max")
      }
   }

   const handleSubmit = () => {

   }

   const userDropdown = (<UserDropdownMenu setRevealEditForm={setRevealEditForm} setDropdownOpen={setDropdownOpen} />)

   return (
      <>
      <div className="topbar">
         <div className='left-masthead'>
            <div className='sidebar-size-button' onClick={toggleSidebar}>
               <img alt="hmbrgr" src={hamburger}/>

            </div>
            <Link className="home-button" to="/">
               <img src={homelogo} alt="HOME" sizes="120x56"/>
            </Link>
         </div>
         <div className='mid-masthead'>
            <div className='search-bar-outer'>
               <div className='search-bar-form' id="search-bar-form" onSubmit={handleSubmit}>
                  <input type="text" className='search-bar-input' placeholder="Search">

                  </input>
               </div>
               <div className='search-button'>
                  <input className='search-button-input' type="submit" value={search} form="search-bar-form"></input>
                  <img src={magGlass}></img>
               </div>
               
            </div>
            {/* <div className='microphone-button'>
               <img src={micIcon}></img>
            </div> */}
         </div>
         <div className='right-masthead'>
            <UserMastheadControls revealUpload={revealUpload} setRevealUpload={setRevealUpload} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}/>
         </div>

      </div>
      {dropdownOpen && <OutsideAlerter children={userDropdown} unfocus={() => setDropdownOpen(false)}/>}
      </>
   )
}

export default TopBar;