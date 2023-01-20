import "./UserEditForm.css"
import "../forms.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../store/users";
import { ProfilePic } from "../../../utils/ProfPic/ProfilePic";
import { useRef } from "react";
import OutsideAlerter from "../../../utils/_outsideClickDetector";
import { deleteUser } from "../../../store/users";
import { useHistory } from "react-router-dom";

const UserEditForm = (props) => {
   const dispatch = useDispatch();
   const history = useHistory()
   const hiddenFileInput = useRef();
   const setRevealEditForm = props.setRevealEditForm;
   const sessionUser = useSelector(state => state.session.user ? state.session.user : null);
   const sessionUserId = sessionUser ? sessionUser.id : null;
   const oldHandle = sessionUser ? sessionUser.handle : null;
   const oldPic = sessionUser ? sessionUser.sessionUserPic : null;
   const firstName = sessionUser ? sessionUser.firstName : null;
   const [ handle, setHandle ] = useState(sessionUser ? sessionUser.handle : "")
   const [ handleFocus, setHandleFocus ] = useState("focused")
   const [ newPic, setNewPic ] = useState(null);
   const [ preview, setPreview ] = useState(null)
   const isChanged = sessionUser ? (oldHandle !== handle || newPic) : null;

   const submitEdits = () => {
      dispatch(editUser({
         handle,
         newPic
      }, sessionUser.id))
      setRevealEditForm(false)
   }

   const chooseNewPic = () => {
      hiddenFileInput.current.click()
   }

   const addNewPic = e => {
      const file = e.currentTarget.files[0]
      const previewPic = URL.createObjectURL(file)
      setPreview(previewPic)
      setNewPic(file)
   }

   const deleteAccount = () => {
      if (sessionUserId === 1) {
         window.alert("Trying to delete the demo account? Tsk tsk... try making an account to use this feature")
         return
      }
      if (window.confirm("Are you really sure you want to do that...")) {
         dispatch(deleteUser(sessionUserId))
         .then(setRevealEditForm(false))
         .then(history.push("/"))
      }
   }

   const handleInput = (<input className='handle-input' data-focus={handleFocus} type="text" value={handle} onChange={e => setHandle(e.target.value)}></input>)

   return (
      <div className="user-edit-page">
         <div className="outside-modal" onClick={() => setRevealEditForm(false)}></div>
         <div className="user-edit-form" onSubmit={submitEdits}>
         <div className="cancel-edits-button" onClick={() => setRevealEditForm(false)}>X</div>
            <div id="picture-container">
               <input id="hidden-input" type="file" ref={hiddenFileInput} onChange={e => addNewPic(e)}/>
               {!preview && <ProfilePic image={oldPic} firstName={firstName} />}
               {preview && <ProfilePic image={preview} firstName={firstName} />}
               <i className="fa-solid fa-pencil" onClick={chooseNewPic}></i>
            </div>
            <div className="edit-handle-container">
               <div id="placeholder" data-focus={handleFocus}>Change your handle</div>
               <OutsideAlerter children={handleInput} focus={() => setHandleFocus("focused")} unfocus={() => setHandleFocus("unfocused")} blockCondition={handle !== ""}/>
            </div>
            <div className="bottom-edit-form">
               <div className='save-edits-button'
                  style={{
                     backgroundColor: isChanged ? 'orange' : 'grey',
                     color: isChanged ? '#1e1e1e' : 'rgb(121, 63, 5)',
                     disabled: isChanged ? 'false' : 'true',
                     cursor: isChanged ? 'pointer' : 'default'
                  }}
                  onClick={submitEdits}>Save changes
               </div>
               <div className="delete-user-button" onClick={deleteAccount}>
                  Delete your account
               </div>
            </div>
            
            {/* <br/>
            <label>Description:
               <br/>
               <textarea type="text" value={description} placeholder="Give us a scary description" onChange={e => setDescription(e.target.value)}></textarea>
            </label>
            <br/>
            <input type="file" onChange={handleFile}/>
            <br/>
            <input type="submit" value="Submit Video"/> */}
         </div>
      </div>
   )
}

export default UserEditForm;