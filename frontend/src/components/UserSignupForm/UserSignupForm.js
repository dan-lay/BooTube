import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UserSignupForm.css'
import boogleLogo from '../../assets/boogle_logo.png';
import * as sessionActions from "../../store/session"
import spookyGhost from '../../assets/spooky_ghost.png'

const UserSignupForm = () => {
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [handle, setHandle] = useState("");
   const [errors, setErrors] = useState([]);
   const sessionUser = useSelector(state => state.session.user);


   if (sessionUser) return <Redirect to="/"/>;

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         setErrors([]);
         return dispatch(sessionActions.signup({email, password, firstName, lastName, handle}))
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

   return (
      <div className="signup-page">
         <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
         </ul>
         <form className="signup-form-page" onSubmit={handleSubmit}>
            <div className="signup-form-container">
               <div className='left-signup-container'>
               <div className="signup-form-upper-container">
                  <div className="boogle-logo">
                     <img alt="BOOGLE" sizes="75x24" src={boogleLogo}/>
                  </div>
                  <div className="sign-up">Create your Boogle Account</div>
                  <div className="to-continue-to-bootube">to continue to BooTube</div>
               </div>
               <div className="signup-form-mid-container">
                  <div className="signup-form-mid-upper">
                     <input className="fname-input" placeholder="First name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                     <input className="lname-input" placeholder="Last name" type="text" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                     <input className="email-input" placeholder="Your email address" type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                     <input className="handle-input" placeholder="Create a handle" type="text" value={handle} onChange={e => setHandle(e.target.value)}></input>
                     <p className='email-disclaimer'>You'll need to confirm that this email belongs to you</p>
                     <div className="use-demo-account-instead">
                        <Link className="demo-account-link" to="/login">Login with Demo Account instead</Link>
                     </div>
                     <input className="password-input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                     <input className="confirm-password-input" placeholder="Confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                     <p>Use 6 or more characters with a mix of letters, numbers & symbols</p>
                     <input type="checkbox"></input>
                     <div>Show password</div>
                  </div>
               </div>
               <div className="email-form-lower-container">
                  <div className="email-lower-upper">
                     
                  </div>
                  <div className="email-lower-lower">
                     <Link className="signin-instead" to="/login">Sign in instead</Link>
                     <button className="create-account-button" type="submit">Next</button>
                  </div>
               </div>


               </div>   
               <div className="right-signup-container">
                  <div className='graphic-container'>
                     <img className="ghost-image" src={spookyGhost} width="244px" height="244px"></img>
                  </div>
                  <div className='graphic-caption'>
                     <p>careful! a spooky ghost!</p>
                  </div>
               </div>
            </div>
            <div className="password-form-container">
               <div className="password-form-upper-container">
                  <div className="boogle-logo"></div>
                  <div className="welcome">Welcome</div>
                  <div className="back-to-email-button">
                     <div className="silhouette-icon"></div>
                     <div className="current-user-email">this will be current email</div>
                     <div className="arrow-decoration"></div>
                  </div>
               </div>
               <div className="password-form-mid-container">
                  <input className="password-input" type="password"></input>
                  <div className="password-mid-lower">
                     <div className="show-pasword-container">
                        <label>Show password
                           <input type="checkbox"></input>
                        </label>
                     </div>
                     <div className="blank-div"></div>
                  </div>
               </div>
               <div className="password-form-lower-container">
                  <button className="forgot-password">Forgot password</button>
                  <button className="login-button">Next</button>
               </div>
            </div>
         </form>
         <div className="signup-bottom-details">
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