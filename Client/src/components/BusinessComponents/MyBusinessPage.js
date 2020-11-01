import React, { Component } from 'react';
import MyProducts from './MyProducts';
import MyOrders from './MyOrders';
import About from './About';

class MyBusinessPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showMyAbout: true,
            showMyOrders: false,
            showMyProducts: false,
            showMyBusinessdetails: false,
            businessClicked: false
        }

        this.showView = this.showView.bind(this);
    }


    showView = (param) => {


        console.log(param)

        if (param === 'About') {
            this.setState({
                showMyAbout: true,
                showMyOrders: false,
                showMyProducts: false,
                showMyBusinessdetails: false
            });
        } else if (param === 'my orders') {
            this.setState({
                showMyAbout: false,
                showMyOrders: true,
                showMyProducts: false,
                showMyBusinessdetails: false
            });
        }
        else if (param === 'my products') {
            this.setState({
                showMyAbout: false,
                showMyOrders: false,
                showMyProducts: true,
                showMyBusinessdetails: false
            });
        }
        else if (param === 'business details') {
            this.setState({
                showMyAbout: false,
                showMyOrders: false,
                showMyProducts: false,
                showMyBusinessdetails: true
            });
        }
        else {
            this.setState({
                showMyAbout: false,
                showMyOrders: false,
                showMyProducts: false,
                showMyBusinessdetails: false
            });
        }

        this.setState({
            businessClicked: true
        })

    }



    render() {

        const showHideClassName = this.props.showMyBusinessPageModal ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName}>

                <div className="business-page" >
                    <div  className="modal-main">
                        <div className="top-right-div">
                            <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                        </div>

                        <div className="business-nav">
                            <h1>{this.props.userBusiness.businessName}</h1>

                            <li><a href="#" onClick={() => this.showView('About')}>About</a></li>
                            <li><a href="#" onClick={() => this.showView('my orders')}>My Orders</a></li>
                            <li><a href="#" onClick={() => this.showView('my products')}>Products</a></li>

                        </div>
                        <About showMyAbout={this.state.showMyAbout} />

                        {this.state.businessClicked ?
                            <div>

                                <MyProducts userBusiness={this.props.userBusiness} showMyProducts={this.state.showMyProducts} />
                                <MyOrders userBusiness={this.props.userBusiness} showMyOrders={this.state.showMyOrders} />
                            </div> :
                            <div></div>
                        }
                    </div>
                </div>


            </div>
        );
    }
}

export default MyBusinessPage;
