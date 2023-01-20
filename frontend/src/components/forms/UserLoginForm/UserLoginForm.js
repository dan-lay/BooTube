import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import "../forms.css"
import "./UserLoginForm.css"
import boogleLogo from '../../../assets/boogle_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/session';
import OutsideAlerter from '../../../utils/_outsideClickDetector';
import isEnterPress from '../../../utils/_isEnterPress'
import { checkEmail } from '../../../store/users';
import { ProfilePic } from '../../../utils/ProfPic/ProfilePic';


const UserLoginForm = () => {
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const [ emailFocus, setEmailFocus ] = useState("unfocused")
   const [ passwordFocus, setPasswordFocus ] = useState("focused")
   const [ revealPassword, setRevealPassword ] = useState("password")
   const [form, setForm] = useState("email");
   const sessionUser = useSelector(state => state.session.user);
   const user = useSelector(state => state.users ? state.users: null)
   const userEmail = user ? user.email : null;
   const userPic = user ? user.profileImage : null;
   const userName = user ? user.firstName : "You're not supposed to be here";
   
   if (sessionUser) return <Redirect to="/"/>;
   
   const demoLogin = () => {
      setEmailFocus("focused")
      const demoEmail = "demouser@gmail.com";
      const demoPassword = "password";
      let i = 0;
      
      const timedInput = setInterval(() => {
         if (i === demoEmail.length + demoPassword.length + 1) {
            clearInterval(timedInput)
            dispatch(login({email: demoEmail, password: demoPassword}))
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
               return
            }
            
            if (i < demoEmail.length) {
               setEmail(demoEmail.substring(0, i + 1));
            } else {
               setPassword(demoPassword.substring(0, i - demoEmail.length));
            }
            
            i += 1;
            
         }, 100)
      }

      const handleEmail = () => {
         if (email !== "") {
            dispatch(checkEmail(email))
            .then(setForm("password"))
            .catch(console.log("unable to find that damn user"))
         }
      }
      
      const handlePassword = () => {
         setErrors([]);
         dispatch(login({email, password}))
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
      
      const handleBack = () => {
         setForm("email")
      }

      const emailInput = (<input className='email-input' data-focus={emailFocus} type="text" value={email} onKeyDown={e => isEnterPress(e, handleEmail)} onChange={e => setEmail(e.target.value)}></input>)
      const passwordInput = (<input className='password-input' data-focus={passwordFocus} type={revealPassword} value={password} onKeyDown={e => isEnterPress(e, handlePassword)} onChange={e => setPassword(e.target.value)}></input>)
      const userTile = user ?
                       <div className='user-tile'>
                           <ProfilePic image={userPic} firstName={userName}/>
                           <div>{userEmail}</div>
                       </div>
                       :
                       "You do not exist..."
      
      return (
         <div className="form-page" id='signin-page'>
         {/* <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
         </ul> */}
         <div className='form-portal' id='signin-portal'>
            <div className='logo-container'>
               <img id='signin' alt="BOOGLE" src={boogleLogo}/>
            </div>
            <div className='welcome' id='signin'>
               {form === "email" ? "Sign in" : `Hi ${userName}`}
            </div>
            <div className='sub-welcome' id='signin'>
               {form === "email" ? "to continue to BooTube" : userTile}
            </div>
            <div className='forms-container' id='signin' data-form={form}>
               <div id='email-form'>
                  <div className='email-container'>
                     <div data-focus={emailFocus} id='placeholder'>Email</div>
                     <OutsideAlerter children={emailInput} focus={() => setEmailFocus("focused")} unfocus={() => setEmailFocus("unfocused")} blockCondition={email !== ""}/>
                  </div>
                  <div className="demo-user-container">
                     <div className="demo-user" onClick={demoLogin}>Demo user?</div>
                  </div>
                  <div className="dev-prompt">Too scared? Take a break and check out the developer. </div>
                  <a className="dev-link" href="https://www.linkedin.com/in/dan-lay/">Learn more</a>
                  <div className='bottom-button-container'>
                     <Link className="create-account" to="/signup">Create account</Link>
                     <button className="next-button" onClick={handleEmail}>Next</button>
                  </div>
               </div>
               <div id='password-form'>
                  <div className='password-container'>
                     <div data-focus={passwordFocus} id='placeholder'>Enter your password</div>
                     <OutsideAlerter children={passwordInput} focus={() => setPasswordFocus("focused")} unfocus={() => setPasswordFocus("unfocused")} blockCondition={password !== ""}/>
                  </div>
                  <div className='show-password-container'>
                     <input id="checkbox" type="checkbox" onClick={revealPassword === "password" ? () => setRevealPassword("text") : () => setRevealPassword("password")}></input>
                     <div className='show-password'>Show password</div>
                  </div>
                  <div className='bottom-button-container'>
                     <div className='create-account' onClick={handleBack}>Turn Back</div>
                     <button className="next-button" onClick={handlePassword}>Next</button>
                  </div>
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

export default UserLoginForm;