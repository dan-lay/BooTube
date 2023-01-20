import "./UserEditForm.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../store/users";

const UserEditForm = (props) => {
   const dispatch = useDispatch();
   const setRevealEditForm = props.setRevealEditForm;
   const sessionUser = useSelector(state => state.session ? state.session.user : null);
   const [ handle, setHandle ] = useState(sessionUser ? sessionUser.handle : "")

   const submitEdits = () => {
      dispatch(editUser({
         handle
      }, sessionUser.id))
      setRevealEditForm(false)
   }

   const exitModal = () => {
      setRevealEditForm(false)
   }

   return (
      <div className="user-edit-page">
         <div className="outside-modal" onClick={exitModal}></div>
         <form className="user-edit-form" onSubmit={submitEdits}>
            <label>Handle:
               <br/>
               <input type="text" value={handle} onChange={e => setHandle(e.target.value)}/>
            </label>
            {/* <br/>
            <label>Description:
               <br/>
               <textarea type="text" value={description} placeholder="Give us a scary description" onChange={e => setDescription(e.target.value)}></textarea>
            </label>
            <br/>
            <input type="file" onChange={handleFile}/>
            <br/>
            <input type="submit" value="Submit Video"/> */}
         </form>
      </div>
   )
}

export default UserEditForm;