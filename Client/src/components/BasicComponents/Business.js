import React, { Component } from 'react';
import axios from 'axios';
import MyCart from './MyCart';

class Business extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: '',
            isLoading: true,
            cartProducts: '',
            cartInitialized: false,
            showMyCartModal: false
        }

        this.addToCart = this.addToCart.bind(this);
        this.showCartView = this.showCartView.bind(this);
        this.hideCartView = this.hideCartView.bind(this);

    }


    addToCart = (product) => {

        this.setState({
            cartInitialized: true
        });

        if (this.state.cartProducts != '') {
            const productIndex = this.state.cartProducts.findIndex(item => item._id == product._id);
            let newArray = [...this.state.cartProducts];
            product.cartquantity = product.cartquantity + 1;
            newArray[productIndex] = product

            this.setState({
                cartProducts: newArray
            });


            if (productIndex == -1) {
                product.cartquantity = 1;
                this.setState({
                    cartProducts: [...this.state.cartProducts, product]
                });
            }
        }
        else {
            product.cartquantity = 1;
            this.setState({
                cartProducts: [...this.state.cartProducts, product]
            });
        }



    }

    removeProductFromCart = (product) => {

        this.setState({
            cartProducts: this.state.cartProducts.filter(item => item._id !== product._id)
        });

        if (this.state.cartProducts.length == 0) {
            this.setState({
                cartInitialized: false
            });
        }
    }


    showCartView = () => {
        this.setState({
            showMyCartModal: true
        })
    }

    hideCartView = () => {
        this.setState({
            showMyCartModal: false
        })
    }


    componentDidMount() {
        console.log(this.props)
        axios.get(`http://localhost:8080/api/products/` + this.props.store._id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    products: res.data,
                    isLoading: false
                })
            });
    }

    render() {

        if (this.state.isLoading) {
            return <div>is loading...</div>
        }
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <div className="modal-main">
                    <div className="top-right-div">
                    <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                        

                        
                    </div>
                    <div className="order-status-spinner">
                            <button className="greyButton" onClick={() => this.showCartView()}>Cart {this.state.cartProducts.length}</button>
                        </div>
                    <h6 className="modal-header">{this.props.store.businessName}</h6>
                    <h6 className="center-container">{this.props.store.businessDescription}</h6>

                  
                    <div className="business-container">

                        {this.state.products.map((product) => (
                            <div key={product._id}
                                className="product-div">


                                <p className="price-tag">{product.price}€</p>
                                <img className="product-image" src={"https://www.pngonly.com/wp-content/uploads/2017/06/Food-Chicken-Salad-PNG.png"} />


                                <div className="product-description">

                                    <h4>{product.productName}</h4>

                                </div>


                                <button className="addtocart-button" onClick={() => this.addToCart(product)}>Add To Cart</button>


                            </div>


                        ))}

                    
                    </div>
                    {this.state.showMyCartModal ?
                        <MyCart
                            store={this.props.store}
                            cartProducts={this.state.cartProducts}
                            removeProductFromCart={() => this.removeProductFromCart()}
                            showMyCartModal={this.state.showMyCartModal}
                            hideCartView={() => this.hideCartView()}
                            user={this.props.user} />
                        :
                        <div></div>
                    }
                </div>

            </div>
        );
    }

}



export default Business;