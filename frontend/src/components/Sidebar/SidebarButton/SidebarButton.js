import { useEffect } from 'react';
import './SidebarButton.css'

const SidebarButton = (props) => {
   const func = props.onClickFunc;
   const icon = props.icon;
   const text = props.text;
   const sidebarSize = props.sidebarSize;

   return (
      <div className={`sidebar-button ${sidebarSize}`} onClick={() => func()}>
         {icon}
         <p className='sidebar-button-text'>{text}</p>
      </div>
   )
}

export default SidebarButton;