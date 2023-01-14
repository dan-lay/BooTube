import React, { useState } from "react";
import { createVideo } from "../../store/videos";
import { useDispatch, useSelector } from "react-redux";
import './UploadVideoModal.css'
import { Redirect, useHistory } from "react-router-dom";

const UploadVideoModal = (props) => {
   const dispatch = useDispatch();
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [videoFile, setVideoFile] = useState(null);
   const [errors, setErrors] = useState("");
   const uploaderId = useSelector(state => state.session.user.id);
   const history = useHistory();
   const setRevealUpload = props.setRevealUpload;

   const handleFile = e => {
      const file = e.currentTarget.files[0];
      setVideoFile(file);
   }

   const exitModal = () => {
      setRevealUpload(false)
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("video[title]", title)
      formData.append("video[description]", description)
      formData.append("video[uploader_id]", uploaderId)
      if (videoFile) {
         formData.append("video[media_object]", videoFile)
      }
      dispatch(createVideo(formData))
      .then(async data => {
         const videoId = data.video.id;
         history.push(`/videos/${videoId}`)
      })
      // .catch(async)

      

   }

   return (
      <div className="upload-video-modal">
         <div className="outside-modal" onClick={exitModal}></div>
         <form className="upload-video-form" onSubmit={handleSubmit}>
            <label>Title:
               <br/>
               <input type="text" value={title} placeholder="Add a title" onChange={e => setTitle(e.target.value)}/>
            </label>
            <br/>
            <label>Description:
               <br/>
               <textarea type="text" value={description} placeholder="Give us a scary description" onChange={e => setDescription(e.target.value)}></textarea>
            </label>
            <br/>
            <input type="file" onChange={handleFile}/>
            <br/>
            <input type="submit" value="Submit Video"/>
         </form>
      </div>
   )
}

export default UploadVideoModal;