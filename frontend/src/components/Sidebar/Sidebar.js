import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'
import SidebarButton from './SidebarButton/SidebarButton';

const Sidebar = (props) => {
   const history = useHistory();
   const sidebarSize = props.sidebarSize;
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null)
   const homeIcon = (<i className="fa-solid fa-house"></i>)
   const historyIcon = (<i className="fa-regular fa-clock"></i>)
   const subscriptionsIcon = (<i className="fa-solid fa-tower-broadcast"></i>)
   const libraryIcon = (<i className="fa-solid fa-photo-film"></i>)

   const navToHome = () => {
      history.push("/")
   }

   const navToSubs = () => {
      if (sessionUser) {
         console.log("going to subscriptions")
      } else {
         history.push("/login")
      }
   }

   const navToLibrary = () => {
      if (sessionUser) {
         console.log("going to library")
      } else {
         history.push("/login")
      }
   }

   const navToHistory = () => {
      if (sessionUser) {
         console.log("going to history")
      } else {
         history.push("/login")
      }
   }

   return (
      <div className={`sidebar ${sidebarSize}`}>
         <SidebarButton sidebarSize={sidebarSize} onClickFunc={navToHome} text="Home" icon={homeIcon}/>
         <SidebarButton sidebarSize={sidebarSize} onClickFunc={navToSubs} text="Subscriptions" icon={subscriptionsIcon}/>
         <SidebarButton sidebarSize={sidebarSize} onClickFunc={navToLibrary} text="Library" icon={libraryIcon}/>
         <SidebarButton sidebarSize={sidebarSize} onClickFunc={navToHistory} text="History" icon={historyIcon}/>
      </div>
   )
}

export default Sidebar;