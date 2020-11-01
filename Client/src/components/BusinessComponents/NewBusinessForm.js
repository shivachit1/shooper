import React, {Component } from 'react';
import ProfileAvatar from '../../images/avatar.png'

import {storageRef} from '../../firebase';
import uuid from 'react-uuid';
import axios from 'axios';

import Business from '../BasicComponents/Business';



class NewBusinessForm extends Component{

   
   
    constructor(props) {
        super(props);

        this.state={
            businessSaved:false,
            imageId : uuid(),
            businessName:'',
            businessDescription:'',
            lattitude:'',
            longitude:'',
            businessImageUri:ProfileAvatar,
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerNewBusiness = this.registerNewBusiness.bind(this);
        this.changeImage = this.changeImage.bind(this);
        
    }


    changeImage = (event) =>{
       const image = event.target.files[0];

        if(image!=null){
            const uploadTask = storageRef.child(`/businessImages/${this.state.imageId}/${image.name}`).put(image);
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
          storageRef.child('businessImages').child(this.state.imageId).child(image.name).getDownloadURL()
           .then(fireBaseUrl => {
             console.log(fireBaseUrl);
             this.setState({
                businessImageUri:fireBaseUrl
             })
           })
        });
        }
        
        
    }


    handleChange = (event) =>{
        
            const value = event.target.value;
    
            console.log(value);
            console.log(event.target.name);
            this.setState({
              [event.target.name]: value
            });

    }

    registerNewBusiness =()=>{
        
       
        axios.post("http://localhost:8080/api/business",{
            businessOwner:this.props.user._id,
            businessName :this.state.businessName,
            businessImageUri: this.state.businessImageUri,
            businessDescription:this.state.businessDescription,
            location : {
                lattitude:this.state.lattitude,
                longitude:this.state.longitude
            } 
        
        }).then((res)=>{
            console.log('business saved'+res);
            this.setState({
                businessSaved:true
            });
            this.props.handleClose();
        });
    }

    


    render() {

        const showHideClassName =this.props.showNewBusinessFormModal ? "modal display-block" : "modal display-none";
        

        return(
            <div className={showHideClassName}>
                <section className="modal-main" >
                <div className="top-right-div">
                     <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                </div>
                <h6 className="modal-header">New Business Page</h6>
                
                <div>
                    
                
                    <img className="profile-image" src={this.state.businessImageUri} alt="google" />

                    <input type="file" id="file-upload" accept="image/*" onChange={this.changeImage} style={{display:"none" }} required/>
                    <label className="modal-fileupload-button" htmlFor="file-upload" required>Upload file</label>
                   
                    </div>

                <div className="form" >
                    <label> Business Name:
                    <input className="form-input" name="businessName" placeholder="Business Name" required onChange={this.handleChange}></input>
                    </label>

                    <label> Business Description:
                    <textarea className="form-input" name="businessDescription" placeholder="Short description about your Business" onChange={this.handleChange}></textarea>
                    </label>

                    <label> Location:
                    <input className="form-input"  type="number" name="lattitude" placeholder=" lattitude (i.e 20.344)" onChange={this.handleChange}></input>
                    <input className="form-input" type="number" name="longitude" placeholder="longitude (i.e 20.344)" onChange={this.handleChange}></input>
                    </label>
                
                    <div className="light-bg">
                    <button className="greenButton" onClick={this.registerNewBusiness}>Register</button>
                    </div>
                   
                </div>

                </section>
            </div>
        );
    }
}

export default NewBusinessForm;
