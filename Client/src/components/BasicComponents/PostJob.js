import React, { Component } from 'react';

const PostJob = ({ handleClose, showPostJobModal }) => {
    const showHideClassName = showPostJobModal ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName} onClick={handleClose}>
            <div className="modal-main">
            <button className="modal-close-button" onClick={handleClose}>X</button>
            <h6 className="modal-header">Create New Job</h6>
                <div className="form" onClick={()=>showPostJobModal}>
                
                
                    <input className="text" type="text" placeholder="Job Title" />
                    <input className="text" type="text" placeholder="Description" />
                    <input className="text" type="text" placeholder="Time Duration" />
                    <input className="text" type="text" placeholder="Location" />
                    <input className="text" type="text" placeholder="Contact Info" />
                    <button className="sign-in">Post Job</button>

                </div>

            </div>
        </div>
    );
};


export default PostJob;
