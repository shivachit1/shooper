import React, { Component, useState} from 'react';
import { connect } from 'react-redux';
import { loggedUser, signOutUser } from '../../actions/authAction.js';
import Signin from './SignIn.js';
import ProfileAvatar from '../../images/avatar.png';
import Profile from './Profile';
import MyOrders from './MyOrders';
import Payment from './Payment';
import NewBusinessForm from '../BusinessComponents/NewBusinessForm.js';
import MyBusinessPage from '../BusinessComponents/MyBusinessPage.js';
import RegisterBusiness from '../BusinessComponents/RegisterBusiness';


class  Navbar extends Component {

     state={
        showSignInModal:false,
        showDropDownMenu:false,
        showMyProfileModal: false,
        showMyOrdersModal: false,
        showMyPaymentModal: false,
        showBusinessLoginModal:false
    }
    constructor(props) {
        super(props);
        this.props.loggedUser();
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    }
    showSignInModal = () => {
     
        this.setState({showSignInModal:true})
    };

   

    showMyProfileModal = () => {
        
            this.setState({
                showMyProfileModal: true
            });
          
    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ showDropDownMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
      }
    
      hideDropdownMenu() {
        this.setState({ showDropDownMenu: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
    
      }


    showModal = (modalName) => {
        if (modalName === 'showMyOrdersModal') {
            this.setState({
                showMyOrdersModal: true,
                showMyProfileModal: false,
                showMyPaymentModal: false,
                showBusinessLoginModal:false
            });

            console.log('myorders');
        } else if (modalName === 'showMyProfileModal') {
            this.setState({
                showMyOrdersModal: false,
                showMyProfileModal: true,
                showMyPaymentModal: false,
                showBusinessLoginModal:false
            });
            console.log('profile');
        }
        else if (modalName === "showMyPaymentModal") {
            this.setState({
                showMyOrdersModal: false,
                showMyProfileModal: false,
                showMyPaymentModal: true,
                showBusinessLoginModal:false
            });
        }
        else if(modalName === "showBusinessLoginModal"){
            this.setState({
                showMyOrdersModal: false,
                showMyProfileModal: false,
                showMyPaymentModal: false,
                showBusinessLoginModal:true
            });
        }

    };

    hideModal = () => {

        this.setState({
            showSignInModal:false,
            showMyOrdersModal: false,
            showMyProfileModal: false,
            showMyPaymentModal: false,
            showBusinessLoginModal:false
        });

    };

    render() {
         const openDropDownMenu =false;
        return (
            
            <nav className="navbar">
                
                {this.state.showSignInModal
                ? 
                <div className="back-drop" onClick={this.hideModal.bind(this)}></div>
                : 
                <div></div>}
                   

                    <div className="app-title">
                    <h2>Shooper</h2>
                    
                    </div>
                    <ul className="link-div"> 
                    {this.props.user !==null ? (
                        <div className="profile-div">
                            <h2 className="name">{this.props.user.userName}</h2>
                            <img className="profile-small-image" src={this.props.user.userImageUri} alt="google" onClick={this.showDropdownMenu} />
                            {this.state.showDropDownMenu ? (
                                <UserDetails>
                                <DropMenu signOutUser={this.props.signOutUser}>
                                <button className="dropdown_menuItem" onClick={() => this.showModal('showMyProfileModal')}>My Profile</button>
                                <button className="dropdown_menuItem" onClick={() => this.showModal('showMyOrdersModal')}>My Orders</button>
                                <button className="dropdown_menuItem" onClick={() => this.showModal('showMyPaymentModal')}>Payment</button>
                                <button className="greenButton-block" onClick={()=>this.showModal('showBusinessLoginModal')}>Business Page</button>
                                <button className="sign-out"  onClick={this.props.signOutUser}>Sign Out</button>
                                </DropMenu>
                            </UserDetails>
                            ):(
                                null
                            )}
                            

                            <Profile user={this.props.user} showMyProfileModal={this.state.showMyProfileModal} handleClose={this.hideModal.bind(this)}/>
                            
                           
                            <MyOrders user={this.props.user} showMyOrdersModal={this.state.showMyOrdersModal} handleClose={this.hideModal}/>
                            
                            <Payment user={this.props.user} showMyPaymentModal={this.state.showMyPaymentModal} handleClose={this.hideModal}/>
                
                            <RegisterBusiness user ={this.props.user} showBusinessLoginModal={this.state.showBusinessLoginModal} handleClose={this.hideModal}/>
                            
                        </div>
                        
                        ) : (
                            
                            <button className="sign-in"  onClick={this.showSignInModal}>Sign In</button>
                        )}
                    </ul>
                  
                    <Signin showSignInModal={this.state.showSignInModal} closeSignInModalHandler={this.hideModal.bind(this)}/>
                   
            </nav>
        )
    }

}
const UserDetails = (props) =>{
    
    return(
        <div>
           {props.children}
        </div>
    );
}
const DropMenu = (props) =>{
    
    return(
        <div className="dropdown_menu">
                 
             {props.children}
             
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        user:state.userData.user
    }
}

export default connect(mapStateToProps, { loggedUser, signOutUser })(Navbar);
