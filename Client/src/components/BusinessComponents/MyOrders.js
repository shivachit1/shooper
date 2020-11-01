import React, { Component } from 'react';
import OrderStatusSpinner from '../BasicComponents/OrderStatusSpinner';
import axios from 'axios';

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            showOrderStatusSpinnerMenu: false,
            selectedStatus: "all",
            myOrders: [],
            tempOrders:[]
        }
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.selectedOrderStatus = this.selectedOrderStatus.bind(this);
        this.trackOrder = this.trackOrder.bind(this);
        this.viewOrderDetails = this.viewOrderDetails.bind(this);
    }

    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ showModal: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });

        console.log('shown');
    }

    hideDropdownMenu = () => {
        this.setState({ showModal: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
        console.log('hide');
    }

    selectedOrderStatus = (params) => {

        let fileredItems = this.state.myOrders;

        if (params === 'All') {

        }
        else {
            fileredItems = this.state.myOrders.filter((item) => item.status === params ? true : false);
        }

        this.setState({ selectedStatus: params });

        console.log(params);
        this.setState({ tempOrders: fileredItems });

    }


    trackOrder = (orderID) => {
        console.log('track Order of :' + orderID);
    }

    viewOrderDetails = (orderID) => {
        console.log('view order details of :' + orderID);
    }


    componentDidMount() {
        axios.get('http://localhost:8080/api/orders/business/' + this.props.userBusiness._id).then((res) => {

            this.setState({
                myOrders: res.data,
                tempOrders:res.data,
                isLoading: false
            })

        });
    }


    render() {

        const showHideClassName = this.props.showMyOrders ? "myorders-container display-block" : "myorders-container display-none";



        return (
            <div className={showHideClassName}>

                <div >
                    <div className="top-right-div">
                        <OrderStatusSpinner selectedOrderStatus={this.selectedOrderStatus} />
                    </div>

                    <h6 className="modal-header">My Orders</h6>

                    <div className="business-container">
                        {this.state.tempOrders.map(order => (
                            <div className="product-div" key={order._id}>
                                
                                
                                
                             
                         
                                <p className="price-tag">{order.totalPrice}€</p>
                                <p className="title">Order By: Name</p>
                                <p className="title">Order Time</p>
                                <p className="title">Delivery Address</p>
                                <p className="title">{order.status}</p>
                                
                                <div className="center">
                                     <p className="lightBlue-button" onClick={() => this.viewOrderDetails(order._id)}>View Details</p>
                                <p className="lightBlue-button" onClick={() => this.viewOrderDetails(order._id)}>Track Order</p>
                                </div>
                               
                            </div>


                        ))}
                    </div>
                </div>

            </div>
        );
    }

};



export default MyOrders;