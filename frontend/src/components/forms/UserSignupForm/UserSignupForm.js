import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "../forms.css"
import './UserSignupForm.css'
import boogleLogo from '../../../assets/boogle_logo.png';
import spookyGhost from '../../../assets/spooky_ghost.png'
import { createUser } from '../../../store/users';
import OutsideAlerter from '../../../utils/_outsideClickDetector';

const UserSignupForm = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [handle, setHandle] = useState("");
   const [ firstNameFocus, setFirstNameFocus ] = useState("unfocused")
   const [ lastNameFocus, setLastNameFocus ] = useState("unfocused")
   const [ emailFocus, setEmailFocus ] = useState("unfocused")
   const [ handleFocus, setHandleFocus ] = useState("unfocused")
   const [ passwordFocus, setPasswordFocus ] = useState("unfocused")
   const [ confirmPasswordFocus, setConfirmPasswordFocus ] = useState("unfocused")
   const [ revealPassword, setRevealPassword ] = useState("password")
   const [errors, setErrors] = useState([]);
   const sessionUser = useSelector(state => state.session.user);


   if (sessionUser) return <Redirect to="/"/>;

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         setErrors([]);
         return dispatch(createUser({email, password, firstName, lastName, handle}))
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
      return setErrors(['Passwords do not match']);
   };

   const goToSignin = () => {
      history.push("/login")
   }

   const firstNameInput = (<input className="fname-input" data-focus={firstNameFocus} type="text" value={firstName} onChange={e => setFirstName(e.target.value)}></input>)
   const lastNameInput = (<input className="lname-input" data-focus={lastNameFocus} type="text" value={lastName} onChange={e => setLastName(e.target.value)}></input>)
   const emailInput = (<input className="email-input" data-focus={emailFocus} type="text" value={email} onChange={e => setEmail(e.target.value)}></input>)
   const handleInput = (<input className="handle-input" data-focus={handleFocus} type="text" value={handle} onChange={e => setHandle(e.target.value)}></input>)
   const passwordInput = (<input className="password-input" data-focus={passwordFocus} type={revealPassword} value={password} onChange={e => setPassword(e.target.value)}></input>)
   const confirmPasswordInput = (<input className="confirm-password-input" data-focus={confirmPasswordFocus} type={revealPassword} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>)

   return (
      <div className="form-page" id='signup-page'>
         {/* <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
         </ul> */}
         <div className="form-portal" id='signup-portal'>
            <div className='form-side'>
               <div className='logo-container'>
                  <img id='signup' alt="BOOGLE" src={boogleLogo}/>
               </div>
               <div className='welcome' id='signup'>
                  Create your Boogle Account
               </div>
               <div className='sub-welcome' id='signup'>
                  to continue to BooTube
               </div>
               <div className='forms-container' id='signup'>
                  <div className='name-container'>
                     <div className='first-name-container'>
                        <div data-focus={firstNameFocus} id='placeholder'>First name</div>
                        <OutsideAlerter children={firstNameInput} focus={() => setFirstNameFocus("focused")} unfocus={() => setFirstNameFocus("unfocused")} blockCondition={firstName !== ""}/>
                     </div>
                     <div className='last-name-container'>
                        <div data-focus={lastNameFocus} id='placeholder'>Last name</div>
                        <OutsideAlerter children={lastNameInput} focus={() => setLastNameFocus("focused")} unfocus={() => setLastNameFocus("unfocused")} blockCondition={lastName !== ""}/>
                     </div>
                  </div>
                  <div className='email-handle-container'>
                     <div className='email-container'>
                        <div data-focus={emailFocus} id='placeholder'>Your email address</div>
                        <OutsideAlerter children={emailInput} focus={() => setEmailFocus("focused")} unfocus={() => setEmailFocus("unfocused")} blockCondition={email !== ""}/>
                     </div>
                     <div className='handle-container'>
                        <div data-focus={handleFocus} id='placeholder'>Create a handle</div>
                        <OutsideAlerter children={handleInput} focus={() => setHandleFocus("focused")} unfocus={() => setHandleFocus("unfocused")} blockCondition={handle !== ""}/>
                     </div>
                     <div id='handle-disclaimer'>Make it a good one</div>
                  </div>
                  <div className='password-container'>
                     <div className='password-inputs'>
                        <div className='password-sub'>
                           <div data-focus={passwordFocus} id='placeholder'>Password</div>
                           <OutsideAlerter children={passwordInput} focus={() => setPasswordFocus("focused")} unfocus={() => setPasswordFocus("unfocused")} blockCondition={password !== ""}/>
                        </div>
                        <div className='confirm-sub'>
                           <div data-focus={confirmPasswordFocus} id='placeholder'>Confirm</div>
                           <OutsideAlerter children={confirmPasswordInput} focus={() => setConfirmPasswordFocus("focused")} unfocus={() => setConfirmPasswordFocus("unfocused")} blockCondition={confirmPassword !== ""}/>
                        </div>
                     </div>
                     <div className='password-details'>
                        <div id='password-disclaimer'>Nice and secure ok? Don't want any shady characters with your personal information</div>
                        <div className='show-password-container'>
                           <input id="checkbox" type="checkbox" onClick={revealPassword === "password" ? () => setRevealPassword("text") : () => setRevealPassword("password")}></input>
                           <div className='show-password'>Show password</div>
                        </div>
                     </div>
                  </div>
                  <div className='bottom-button-container'>
                     <div className='create-account' onClick={goToSignin}>Sign in instead</div>
                     <button className="next-button" onClick={handleSubmit}>Next</button>
                  </div>
               </div>
            </div>
            <div className='graphic-side'>
               <img className="ghost-image" src={spookyGhost}></img>
               <div className='ghost-caption'>
                  <p>Take caution. Survival is not guaranteed.</p>
               </div>
            </div>
         </div>
         <div className="bottom-details">
            <div className="bottom-details-left">
               <select className="font-select-dropdown" defaultValue="fonts">
                  <option value="fonts" disabled>Fonts</option>
                  <option value="regular">Regular</option>
                  <option value="chiller">Chiller</option>
                  <option value="wingdings">Wingdings</option>
               </select>
            </div>
            <div className="bottom-details-right">
               <a className="signin-github" href="https://github.com/dan-lay/BooTube">Github</a>
               <a className="signin-linkedin" href="https://www.linkedin.com/in/dan-lay-139103228/">LinkedIn</a>
            </div>
         </div>
      </div>
   )
}

export default UserSignupForm;