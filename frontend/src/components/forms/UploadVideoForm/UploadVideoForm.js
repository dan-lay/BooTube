// thumbnail generator courtesy of https://github.com/Rajesh-Royal/vThumb.js THANK YOU!

import React, { useState, useRef } from "react";
import { createVideo } from "../../../store/videos";
import { useDispatch, useSelector } from "react-redux";
import './UploadVideoForm.css'
import { useHistory } from "react-router-dom";
import OutsideAlerter from "../../../utils/_outsideClickDetector";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";

const UploadVideoForm = (props) => {
   const dispatch = useDispatch();
   const hiddenUploadInput = useRef();
   const [ title, setTitle ] = useState("");
   const [ titleFocus, setTitleFocus ] = useState("unfocused");
   const [ description, setDescription ] = useState("");
   const [ descriptionFocus, setDescriptionFocus ] = useState("unfocused");
   const [ videoFile, setVideoFile ] = useState(null);
   const [ errors, setErrors ] = useState("");
   const [ preview, setPreview ] = useState(null);
   const uploaderId = useSelector(state => state.session.user.id);
   const history = useHistory();
   const setRevealUpload = props.setRevealUpload;

   const setVideo = e => {
      const file = e.currentTarget.files[0];
      setVideoFile(file);


      generateVideoThumbnails(file, 1)
         .then(res => setPreview(res[0]))
   }

   const selectVideo = () => {
      hiddenUploadInput.current.click()
      console.log("choosing video")
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("video[title]", title)
      formData.append("video[description]", description)
      formData.append("video[uploader_id]", uploaderId)
      if (videoFile) {
         formData.append("video[media_object]", videoFile)
         // formData.append("video[thumbnail]", preview)
      }

      console.log(formData)
      dispatch(createVideo(formData))
      .then(async data => {
         const videoId = data.video.id;
         history.push(`/videos/${videoId}`)
      })
      .then(setRevealUpload(false))
      // .catch(async)

   }

   const titleInput = (<input className='title-input' data-focus={titleFocus} type="text" value={title} onChange={e => setTitle(e.target.value)}></input>)
   const descriptionInput = (<textarea className='description-input' data-focus={descriptionFocus} type="text" value={description} onChange={e => setDescription(e.target.value)}></textarea>)
   
   return (
      <div className="upload-video-modal">
         <div className="outside-modal" onClick={() => setRevealUpload(false)}></div>
         <div className="form-portal" id="video-upload" onSubmit={handleSubmit}>
            <input type="file" ref={hiddenUploadInput} id="hidden-input" onChange={e => setVideo(e)}/>
            <div className="thumbnail-container">
               {preview && <img className="upload-preview" src={preview}/>}
               {!videoFile && <div className="video-select-button" onClick={selectVideo}>Choose a video</div>}
            </div>
            <div className="edit-title-container">
               <div id="placeholder" data-focus={titleFocus}>Title</div>
               <OutsideAlerter children={titleInput} focus={() => setTitleFocus("focused")} unfocus={() => setTitleFocus("unfocused")} blockCondition={title !== ""}/>
            </div>
            <div className="edit-description-container">
               <div id="placeholder" data-focus={descriptionFocus}>Add a description</div>
               <OutsideAlerter children={descriptionInput} focus={() => setDescriptionFocus("focused")} unfocus={() => setDescriptionFocus("unfocused")} blockCondition={description !== ""}/>
            </div>
            <div className="submit-video-button"
                 style={{
                     backgroundColor: videoFile && title ? 'orange' : 'grey',
                     color: videoFile && title ? '#1e1e1e' : 'rgb(121, 63, 5)',
                     disabled: videoFile && title ? 'false' : 'true',
                     cursor: videoFile && title ? 'pointer' : 'default'
               }} onClick={e => handleSubmit(e)}>Upload video
            </div>
         </div>
      </div>
   )
}

export default UploadVideoForm;