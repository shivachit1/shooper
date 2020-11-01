import React, {Component} from 'react';
import ProfileAvatar from '../../images/avatar.png';
import {storageRef} from '../../firebase';
import axios from 'axios';

class Profile extends Component {

    constructor(props){
        super(props);

        this.state={
            user:this.props.user,
            userImageUri:ProfileAvatar
        }

    }


    changeImage = (event) =>{
        const image = event.target.files[0];
 
         if(image!=null){
             const uploadTask = storageRef.child(`/userImages/${this.state.user._id}/${image.name}`).put(image);
         uploadTask.on('state_changed', 
         (snapShot) => {
           //takes a snap shot of the process as it is happening
           console.log(snapShot)
         }, (err) => {
           //catches the errors
           console.log(err)
         }, () => {
           // gets the functions from storage refences the image storage in firebase by the children
           // gets the download url then sets the image from firebase as the value for the imgUrl key:
           storageRef.child('userImages').child(this.state.user._id).child(image.name).getDownloadURL()
            .then(fireBaseUrl => {
            

                
              axios.post(`http://localhost:8080/api/auth/user/${this.state.user._id}`,{
                  userName:this.state.user.userName,
                  userEmail:this.state.user.userEmail,
                  googleId:this.state.user.googleId,
                  userImageUri:fireBaseUrl
            
            }).then(()=>{
                axios.get('http://localhost:8080/api/auth/user').then((res)=>{

                    this.setState({
                        user:res.data,
                        userImageUri:res.data.userImageUri
                     });

                });
                
               
              
                
            });
            })
         });
         }
         
         
     }

    render (){
    const showHideClassName = this.props.showMyProfileModal ? "modal display-block" : "modal display-none";

    
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
            <div className="top-right-div">
                     <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                </div>
                <div>
                <h6 className="modal-header">My Profile</h6>
                <div>
                    
                
                <img className="profile-image" src={this.state.userImageUri} alt="google" />
                
                <input type="file" id="userImage-upload" accept="image/*" onChange={this.changeImage} style={{display:"none" }} required/>
                 <label className="modal-fileupload-button" htmlFor="userImage-upload" required>Upload Image</label>
                <h3>{this.props.user.userName}</h3>
                  
                </div>
                    
                </div>

                <div className="div-nav-button">
            </div>
            </section>
        </div>
    );
};

}

export default Profile;