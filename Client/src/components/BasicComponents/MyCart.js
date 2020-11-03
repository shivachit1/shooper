import React, { Component } from 'react';

import axios from 'axios';
import OrderPlaced from './OrderPlaced';
import moment from 'moment';

class MyCart extends Component {



    constructor(props) {
        super(props);
        
        this.state ={
            products:this.props.cartProducts,
            payment:false
            
        }

        console.log(this.state.products)
        this.removeFromCart = this.removeFromCart.bind(this);
        this.payThePayment=this.payThePayment.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
    }



    removeFromCart = (product) =>{
        
        this.setState({
           products: this.state.products.filter(item => item._id !== product._id)
          })
    }

    decreaseQuantity = (product) =>{
        
        const productIndex = this.state.products.findIndex(item => item._id == product._id );
        let newArray = [...this.state.products];
        if(product.cartquantity>1){
            product.cartquantity=product.cartquantity-1;
            newArray[productIndex] = product
    
            this.setState({
                products:newArray
            });
        }
        
        

        
    }

    increaseQuantity = (product) =>{
        
        const productIndex = this.state.products.findIndex(item => item._id == product._id );
        let newArray = [...this.state.products];
        if(product.cartquantity<product.productQuantity){
            product.cartquantity=product.cartquantity+1;
            newArray[productIndex] = product
    
            this.setState({
                products:newArray
            });
        }
       
    }

    payThePayment = () =>{
       
        console.log(this.props.user._id);
        var date = moment().toString();
        axios.post("http://localhost:8080/api/orders",{
        orderBy:this.props.user._id,
        orderTo :this.props.store._id,
        orderTime:date,
        status:"Pending",
        products:this.state.products,
        totalPrice:100
        }).then((res)=>{
            
            
            console.log(moment(res.data.orderTime).toString());
            console.log(res.data);
            this.setState({
                payment:true
            })
            
        });

        console.log(date);

    }


    render(){
        const showHideClassName = this.props.showMyCartModal ? "container display-block" : "container display-none";


        console.log(this.state)
       

    return (
        <div className={showHideClassName}>
            
            <div className="top-right-div">
                     <button className="modal-close-button" onClick={this.props.hideCartView}>X</button>
                </div>
            <h6 className="modal-header">My Cart</h6>

            {this.state.payment ?
                <OrderPlaced/>
                :
                <div>
                <div className="business-container">
                {this.state.products.map((product) => (
                <div key={product._id}
                className="product-div">
                    
                    <button className="delete-button" onClick={()=>this.removeFromCart(product)}>Remove</button>
                     
                     <p className="price-tag">{product.price}€</p>
                     <img className="product-image" src={"https://www.pngonly.com/wp-content/uploads/2017/06/Food-Chicken-Salad-PNG.png"}/>
                     

                     <div>
                     <button onClick={()=>this.decreaseQuantity(product)}>-</button>
                <p className="greenButton">{product.cartquantity}</p>
                     <button onClick={()=>this.increaseQuantity(product)}>+</button>
                    </div>
                     <div className="product-description">
                         
                         <h4>{product.productName}</h4>

                     </div>
                    
                 </div>                            
              
            
                        ))}

            </div> 
            <div className="fixed-div">
                <button className="yellow-button" onClick={()=>this.payThePayment()}>Selected Delivery Location</button>
                <button className="greenButton" onClick={()=>this.payThePayment()}>PAY</button>
            </div>
            </div>
            }
           
          
              
           

           
            
            
        </div>
    );

    }
};


export default MyCart;