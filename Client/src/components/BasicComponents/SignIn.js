import  React from 'react';
import GoogleSignInPic from '../../images/google.png';


const Signin= ({showSignInModal,closeSignInModalHandler}) =>{
        return(

            <div className="signin-modal-wrapper"
                style={{
                    transform: showSignInModal ? 'translateY(15vh)':'translateY(-100vh)',
                    opacity:showSignInModal ? {display:"block"} : {display: "none"}
                }}>
                    
                    <p className="signin-modal-header">Sign In 
                    </p>
                    <div>
                    <a className="google-signin" href="http://localhost:8080/api/auth/google">
                        <img className="google-image" src={GoogleSignInPic} alt="google" />
                        <p className="sigin-text">Sign In With Google</p>
                    </a>
                    </div>
            </div>
        );
}

export default Signin;
