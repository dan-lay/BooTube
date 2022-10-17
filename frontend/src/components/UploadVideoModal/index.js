import React, { useState } from "react";
import { createVideo } from "../../store/videos";
import { useDispatch } from "react-redux";
import './UploadVideoModal.css'

const UploadVideoModal = () => {
   const dispatch = useDispatch();
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [videoSrc, setVideoSrc] = useState(null);
   const [errors, setErrors] = useState("");

   if (videoSrc) console.log(videoSrc);

   const handleSubmit = (e) => {
      e.preventDefault();
      return dispatch(createVideo({title, description, videoSrc}))
         .catch(async (res) => {
            let data;
            try {
               data = await res.clone().json();
            } catch {
               data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
         });
   }

   return (
      <div className="upload-video-modal">
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
            <input type="file" value={videoSrc} onChange={e => setVideoSrc(e.target.files[0])}/>
            <br/>
            <input type="submit" value="Submit Video"/>
         </form>
      </div>
   )
}

export default UploadVideoModal;