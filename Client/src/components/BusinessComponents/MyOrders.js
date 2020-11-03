import React, { Component } from 'react';
import OrderStatusSpinner from '../BasicComponents/OrderStatusSpinner';
import Order from './Order';
import axios from 'axios';
import moment from 'moment';

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            showOrderStatusSpinnerMenu: false,
            selectedStatus: "all",
            myOrders: [],
            tempOrders: [],
            showOrderDetails: false,
            order: ''
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


    trackOrder = (order) => {
        console.log('track Order of :' + order._id);

    }

    viewOrderDetails = (order) => {
        console.log('view order details of :' + order._id);
        this.setState({
            showOrderDetails: true,
            order: order
        })
    }


    componentDidMount() {
        axios.get('http://localhost:8080/api/orders/business/' + this.props.userBusiness._id).then((res) => {

            this.setState({
                myOrders: res.data,
                tempOrders: res.data,
                isLoading: false
            })

        });
    }


    render() {

        const showHideClassName = this.props.showMyOrders ? "myorders-container display-block" : "myorders-container display-none";



        return (
            <div className={showHideClassName}>

                

                {this.state.showOrderDetails ?
                    <Order showOrderDetails={this.state.showOrderDetails} order={this.state.order} />
                    :
                    <div >
                    <OrderStatusSpinner selectedOrderStatus={this.selectedOrderStatus} />
                    

                    <div className="business-container">
                        {this.state.tempOrders.map(order => (
                            <div className="product-div" key={order._id}>

                                <p className="price-tag">{order.totalPrice}€</p>
                                <p className="red-text">{order.status}</p>

                                <div className="center">
                                <p className="title">Order By: Name</p>
                        <p className="title">Order Time:{moment(order.orderTime).format('lll')}</p>
                                <p className="title">Delivery Address</p>
                                    <p className="green-button" onClick={() => this.viewOrderDetails(order)}>View Details</p>
                                </div>

                            </div>


                        ))}
                    </div>
                </div>
                }


            </div>
        );
    }

};



export default MyOrders;