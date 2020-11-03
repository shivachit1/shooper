import React from 'react';
import axios from 'axios';
import moment from 'moment';
const Order = (props) => {

    const showHideClassName = props.showOrderDetails ? "centered-cardView display-block" : "centered-cardView display-none";
    const order = props.order


    const confirmOrder = () => {
        
        console.log(order.orderTime);
    }
    return (
        <div className={showHideClassName}>

            <div className="center">

                <p className="red-text">{order.status}</p>

                <p className="title"><span>{order.totalPrice}€</span></p>
                <p >Order By:{order.orderBy}</p>
                <p>Order Time: {moment(order.orderTime).format('lll')}</p>
                <p>Delivery Address</p>
                <p className="green-button" onClick={() => confirmOrder()}>Confirm</p>
                <p className="red-button" onClick={() => this.viewOrderDetails(order)}>Decline</p>
            </div>
            <div className="light-cardView" key={order._id}>


                {order.products.map((product) => (
                    <div key={product._id}
                        className="product-div">
                        <p className="price-tag">{product.price}€</p>
                        <img className="product-image" src={"https://www.pngonly.com/wp-content/uploads/2017/06/Food-Chicken-Salad-PNG.png"} />

                        <div className="product-description">
                            <h4>{product.productName}</h4>
                        </div>
                    </div>


                ))}



            </div>




        </div>
    )
}


export default Order;