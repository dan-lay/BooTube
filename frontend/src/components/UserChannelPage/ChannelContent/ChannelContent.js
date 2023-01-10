import "./ChannelContent.css"
import { useSelector } from "react-redux"
import ChannelHeader from "./ChannelHeader/ChannelHeader.js"

const ChannelContent = () => {
   const user = useSelector(state => state.users ? state.users : null)

   return (
      <div className="channel-content">
         <ChannelHeader user={user}/>
         
      </div>
   )
}

export default ChannelContent;