import React, {Component } from 'react';
import ProfileAvatar from '../../images/avatar.png'

import {storageRef} from '../../firebase';
import uuid from 'react-uuid';
import axios from 'axios';


class NewProductForm extends Component{

   
    constructor(props) {
        super(props);

        this.state={
            productSaved:false,
            imageId : uuid(),
            productName:'',
            productImageUri:ProfileAvatar,
            productDescription:'',
            price:'',
            productQuantity:'',
            product:this.props.product
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.createNewProduct = this.createNewProduct.bind(this);
        this.changeImage = this.changeImage.bind(this);
        console.log(props);
      
    }


    changeImage = (event) =>{
       const image = event.target.files[0];

        if(image!=null){
            const uploadTask = storageRef.child(`/products/${this.state.imageId}/${image.name}`).put(image);
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
          storageRef.child('products').child(this.state.imageId).child(image.name).getDownloadURL()
           .then(fireBaseUrl => {
             console.log(fireBaseUrl);
             this.setState({
                productImageUri:fireBaseUrl
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

    createNewProduct =()=>{
        
       
        axios.post("http://localhost:8080/api/products",{
            productOwnerId:this.props.userBusiness._id,
            productName :this.state.productName,
            productImageUri:this.state.productImageUri,
            productDescription: this.state.productDescription,
            price:this.state.price,
            productQuantity:this.state.productQuantity

           
        }).then((res)=>{
            console.log('new Product saved'+res);
            this.setState({
                productSaved:true
            });
            this.props.handleClose();
        });
    }

    


    render() {

        const showHideClassName =this.props.showNewProductFormModal ? "modal display-block" : "modal display-none";
        
        console.log(this.state.product)
        return(
            <div className={showHideClassName}>
                <section className="modal-main" >
                <div className="top-right-div">
                     <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                </div>
                <h6 className="modal-header">Create New Product</h6>
                
                <div>
                    
                
                    <img className="profile-image" src={this.state.productImageUri} alt="google" />

                    <input type="file" id="product-image-upload" accept="image/*" onChange={this.changeImage} style={{display:"none" }} required/>
                    <label className="modal-fileupload-button" htmlFor="product-image-upload" required>Upload Image</label>
                   
                    </div>

                <div className="form" >
                    <label> Product Name:
                    <input className="form-input" name="productName" placeholder="Product Name" required onChange={this.handleChange}></input>
                    </label>

                    <label> Product Description:
                    <textarea className="form-input" name="productDescription" placeholder="Short description about your Product" onChange={this.handleChange}></textarea>
                    </label>

                    <label> Product Price €:
                    <input className="form-input"  type="number" name="price" placeholder=" Price 10.20" onChange={this.handleChange}></input>
                    </label>

                    <label> Quantity:
                    <input className="form-input" name="productQuantity" placeholder="Quantity" required onChange={this.handleChange}></input>
                    </label>
                
                    <div className="light-bg">
                    <button className="greenButton" onClick={this.createNewProduct}>Create</button>
                    </div>
                   
                </div>

                </section>
            </div>
        );
    }
}

export default NewProductForm;