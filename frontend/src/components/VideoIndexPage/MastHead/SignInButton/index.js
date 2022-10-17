import './SignInButton.css'
import { Link } from 'react-router-dom';



const SignInButton = () => {

   return (
      <div className="sign-in-button-container">
         <Link to="/login" className="sign-in-button">Sign In</Link>
      </div>
   )
}

export default SignInButton;