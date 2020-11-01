import React, { Component } from 'react';

class Payment extends Component {



    constructor(props) {
        super(props);
        
        this.state ={
            cardHolderName : '',
            cardNumber: '',
            month:'',
            year:'',
            cvv:''
            
        }

        this.handleChange=this.handleChange.bind(this);
        this.RegisterPaymentDetails=this.RegisterPaymentDetails.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;

        console.log(value);
        console.log(event.target.name);
        this.setState({
          [event.target.name]: value
        });
      }

    RegisterPaymentDetails = (event) =>{
        event.preventDefault();

        console.log(this.state);

    }


    render(){
        const showHideClassName = this.props.showMyPaymentModal ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
            <div className="div-nav-button">
            
            </div>
            <div className="top-right-div">
                     <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                </div>
            <h6 className="modal-header">Payment</h6>
            <div className="light-bg">
            <button className="greenButton">+</button>
            
            <h4 className="greenButton">* 9164e</h4>
            </div>
                
                <h5>Add New Payment Details</h5>
                
                <form className="form" onSubmit={this.RegisterPaymentDetails}>
                    <label> Name on Card:
                    <input className="form-input" name="cardHolderName" placeholder="Name on Card" onChange={this.handleChange} required></input>
                    </label>
                    <label> Card Number:
                    <input className="form-input" name="cardNumber" placeholder="Card Number" onChange={this.handleChange} required></input>
                    </label>
                    
                    <label>Expiry Date:
                    <input   className="form-input-inline" name="month" placeholder="MM" onChange={this.handleChange} required></input>/
                    <input  className="form-input-inline"  name="year" placeholder="YY" onChange={this.handleChange} required></input>
                    </label>
                    
                   <div>
                   <label>Security code: CVV
                   <input className="form-input-inline" name="cvv" placeholder="CVV" onChange={this.handleChange} required></input>
                   </label>
                   </div>
                   <div>
                   <input className="greenButton" type="submit" value="Add Card"/>
                   </div>
                   
                   
                </form>
                </div>
                

        </div>
    );

    }
};


export default Payment;