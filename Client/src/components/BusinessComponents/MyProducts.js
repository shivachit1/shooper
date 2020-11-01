import React, {Component } from 'react';
import NewProductForm from './NewProductForm';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import axios from 'axios';

class MyProducts extends Component{
   
    constructor(props) {
        super(props);
        
        this.state ={
            products:null,
            showNewProductFormModal:false,
            isLoading:true,
            editProduct:false,
            productForUpdate:'asd'

        }

        this.showNewProductForm = this.showNewProductForm.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        
    }

    showNewProductForm = () =>{

        this.setState({
            showNewProductFormModal:true
        });

        console.log('asdasd')
    }


    hideModal = () => {

        this.setState({
            showNewProductFormModal:false
        });

    };


    editProduct = (product) => {
        
        console.log('edit product');
       
        this.setState({
            editProduct:true,
            showNewProductFormModal:true,
            productForUpdate:product
        })
        console.log(this.state);
    };

    deleteProduct = (product) => {

        console.log('delete product');
        console.log(product);

        axios.delete(`http://localhost:8080/api/products/`+product._id)
        .then((res)=>{
            console.log(res.data);
            console.log("Product deleted");
            this.setState({
                products: this.state.products.filter(item => item._id !== product._id)
              });


              console.log(this.state.products);
        });

        
      
    };

 
    componentDidMount (){
        console.log(this.props);
        axios.get(`http://localhost:8080/api/products/`+this.props.userBusiness._id)
        .then((res)=>{
            console.log(res.data);
            this.setState({
                products:res.data,
                isLoading:false
            })
        });
    }

    render() {
        
        if(this.state.isLoading){
            return <div>is loading...</div>
        }

        const  showHideClassName =this.props.showMyProducts ? "myproducts-container display-block" : "myproducts-container display-none";
        return(
            
            <div className={showHideClassName}>
                <button className="greenButton-block" onClick={this.showNewProductForm}>+ Create New Product</button>
                {this.state.products!=null ? 
                <TransitionGroup className="business-container">
                {this.state.products.map((product) => (
                    <CSSTransition key={product._id}
                      classNames="animation"                                    
                      timeout={2000}>
                     <div className="product-div">
                        
                        <button className="edit-button" onClick={()=>this.editProduct(product)}>Edit</button>
                         <button className="delete-button" onClick={()=>this.deleteProduct(product)}>Delete</button>
                         
                         <p className="price-tag">{product.price}€</p>
                         <img className="product-image" src={"https://www.pngonly.com/wp-content/uploads/2017/06/Food-Chicken-Salad-PNG.png"}/>
                         
                         <div className="product-description">
                             
                             <h4>{product.productName}</h4>
 
                         </div>
                         
                     
                     
                     </div>
                    </CSSTransition>                              
                  
                
                            ))}
                </TransitionGroup>
                 :
                 <div></div>
                 }
                <NewProductForm 
                userBusiness={this.props.userBusiness} 
                user={this.props.user} 
                editProduct={this.state.editProduct}
                product={this.state.productForUpdate}
                showNewProductFormModal={this.state.showNewProductFormModal} 
                handleClose={this.hideModal}
                />
               
                </div>
        );
    }
}

export default MyProducts;