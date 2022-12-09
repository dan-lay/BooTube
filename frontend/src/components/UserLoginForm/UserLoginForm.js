import { Link, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./UserLoginForm.css"
import boogleLogo from '../../assets/boogle_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../store/session"


const UserLoginForm = () => {
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const sessionUser = useSelector(state => state.session.user);

   if (sessionUser) return <Redirect to="/"/>;

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({email, password}))
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

   const demoLogin = (e) => {
      e.preventDefault();
      const demoEmail = "demouser@gmail.com";
      const demoPassword = "password";
      let i = 0;

      const timedInput = setInterval(() => {
         if (i === demoEmail.length + demoPassword.length + 1) {
            console.log(demoEmail)
            console.log(demoPassword)
            dispatch(sessionActions.login({demoEmail, demoPassword}))
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
            clearInterval(timedInput)
         }

         if (i < demoEmail.length) {
            setEmail(demoEmail.substring(0, i + 1));
         } else {
            setPassword(demoPassword.substring(0, i - demoEmail.length));
         }

         i += 1;

      }, 100)
   }

   const createAccount = () => {
      return <Redirect to="/signup"/>
   }

   return (
      <div className="signin-page">
         <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
         </ul>
         <div className="signin-form-page">
            <form className="email-form-container" onSubmit={handleSubmit}>
               <div className="email-form-upper-container">
                  <div className="boogle-logo">
                     <img alt="BOOGLE" sizes="75x24" src={boogleLogo}/>
                  </div>
                  <div className="sign-in">Sign in</div>
                  <div className="to-continue-to-bootube">to continue to BooTube</div>
               </div>
               <div className="email-form-mid-container">
                  <div className="email-form-mid-upper">
                     <input className="email-input" placeholder="Email or phone" type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                     <input className="temp-password-input" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                     <div className="demo-user-container">
                        <button className="demo-user" onClick={demoLogin}>Demo user?</button>
                     </div>
                  </div>
                  <div className="guest-mode-prompt">Not your computer? Use Guest mode to sign in privately.
                  <br/>
                  <Link className="learn-more-link" to="/learn_more">Learn more</Link>
                  </div>
                  
               </div>
               <div className="email-form-lower-container">
                  <div className="email-lower-upper">
                     
                  </div>
                  <div className="email-lower-lower">
                     <Link className="create-account" to="/signup">Create account</Link>
                     <button className="button-to-password-form">Next</button>
                  </div>
               </div>
            </form>
            <form className="password-form-container">
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
            </form>
            <div className="signin-bottom-details">
               <div className="bottom-details-left">
                  <select className="font-select-dropdown">
                     <option value="0" disabled selected>Fonts</option>
                     <option value="1">Chiller</option>
                     <option value="2">Wingdings</option>
                  </select>
               </div>
               <div className="bottom-details-right">
                  <a className="signin-github" href="https://github.com/dan-lay/BooTube">Github</a>
                  <a className="signin-linkedin" href="https://www.linkedin.com/in/dan-lay-139103228/">LinkedIn</a>
               </div>
            </div>
         </div>
         
      </div>
   )
}

export default UserLoginForm;