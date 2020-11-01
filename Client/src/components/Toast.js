import React from 'react';
const Toast = (props) => {
    return (
        
        <div
        style={{
            transform: props.showSignInModal ? 'translateY(0vh)':'translateY(-100vh)',
            opacity:props.showSignInModal ? 1:0
        }}>
            
            <p className="signin-modal-header">{props.message}
            </p>
        
    </div>
    )
}
export default Toast;
