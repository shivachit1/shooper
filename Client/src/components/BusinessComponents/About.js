import React, { Component } from 'react';
import axios from 'axios';
import WeeklySalesChart from './WeeklySalesChart';
import DaySalesChart from './DaySalesChart';
class About extends Component {



    constructor(props) {
        super(props);
        this.state = {
            myOrders: [],
            totalSales: 0,
            daySales: 0
        }
    }


    componentDidMount() {
        axios.get('http://localhost:8080/api/orders/business/' + this.props.userBusiness._id).then((res) => {

            this.setState({
                myOrders: res.data,
            })


        }).then(() => {
            const length = this.state.myOrders.length;
            var total = 0;
            for (var i = 0; i < length; i++) {
                total += this.state.myOrders[i].totalPrice

            }
            this.setState({
                totalSales: total
            })
            console.log(this.state.totalSales)
        });

    }


    render() {
        const showHideClassName = this.props.showMyAbout ? "vertical-scroll-container display-block" : "vertical-scroll-container display-none";

        return (
            <div className={showHideClassName}>


                <div className="block">
                    <button className="edit-button" onClick={() => this.editProduct()}>Edit</button>
                    <img className="profile-image" src={this.props.userBusiness.businessImageUri} alt="imageview" />
                    <h4>Owner: Shiva Tiwari</h4>
                    <p>{this.props.userBusiness.businessDescription}</p>
                    <h3>Location</h3>
                </div>

                <div className="block">
                    <h4>Gross Sales Report</h4>
                    <h3>{this.state.totalSales}€</h3>
                </div>


                <div className="graph">
                    <div className="graph-container">
                        <DaySalesChart orders={this.state.myOrders} />
                    </div>
                </div>

                <div className="graph">
                    <div className="graph-container">
                        <WeeklySalesChart orders={this.state.myOrders}/>
                    </div>
                </div>



            </div>
        );

    }
};


export default About;