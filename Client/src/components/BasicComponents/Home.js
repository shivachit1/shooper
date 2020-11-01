import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedUser, signOutUser } from '../../actions/authAction.js';
class Home extends Component {


    constructor(props){
        super(props)

        this.state={
            
        }
    }



    render() {
       
        return (
           <div>
            
                <div className="website-info">
                    <h2>Hello {this.props.user!==null ? (this.props.user.userName):("Visitor")} </h2>
                    <h2 className="header">Welcome to Shopper website</h2>
                    <h4>A trusty platform for shopping.</h4>

                    <div className="shopper-info-div">
                    
                    <h4 className="header">Easy to <span>BUY</span> or <span>SELL</span>  products around. </h4>
                    
                    </div>

                    
                </div>
               
                </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
      
        user:state.userData.user
    }
}

export default connect(mapStateToProps, { loggedUser, signOutUser })(Home);
