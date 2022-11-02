import './UserMastheadControls.css'
import { Link } from 'react-router-dom';
import uploadButton from '../../../assets/upload-video-icon.png'
import { useSelector } from 'react-redux';
import signinIcon from '../../../assets/booootube_signin_icon.png';
import threeDot from '../../../assets/3-vertical-dots-icon.png';
import githubIcon from '../../../assets/booootube_github_icon.png';

const UserMastheadControls = () => {
   const currentUser = useSelector(state => state.session.user ? state.session.user : null);
   console.log(currentUser)

   const innerControls = currentUser ? <>
                                          <div className="upload-button">
                                             <Link to='upload'>
                                                <img src={uploadButton}/>
                                             </Link>
                                          </div>
                                          <div className="github-link-button">
                                             <a href='https://github.com/dan-lay/BooTube'>
                                                <img src={githubIcon}/>
                                             </a>
                                          </div>
                                          <div className="user-dropdown-button">

                                          </div>
                                       </>
                                     : <>
                                          <div className='dot-menu'>
                                             <img src={threeDot}></img>
                                          </div>
                                          <div className="sign-in-button-container">
                                             <div className='sign-in-button-icon'>
                                                <img src={signinIcon}></img>
                                             </div>
                                             <Link to="/login" className="sign-in-button">Sign in</Link>
                                          </div>
                                       </>

   return (
      <div className="user-masthead-controls">
         {innerControls}
      </div>
   )
}

export default UserMastheadControls;