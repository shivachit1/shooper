import React, {Component}  from 'react';

import NewBusinessForm from './NewBusinessForm.js';
import MyBusinessPage from './MyBusinessPage.js';

import axios from 'axios';
import Business from '../BasicComponents/Business';
class RegisterBusiness extends Component{
    constructor(props) {
        super(props);


        this.state ={
            showNewBusinessFormModal:false,
            showMyBusinessPageModal:false,
            userBusinesses:null,
            userBusiness:[],
            isLoading:true
        }
        this.showNewBusinesForm = this.showNewBusinesForm.bind(this);
        this.hideModal =this.hideModal.bind(this);
        this.showMyBusinessPage =this.showMyBusinessPage.bind(this);

        

        
    }

    showNewBusinesForm = () =>{
        this.setState({
            showNewBusinessFormModal:true
        });
    }

    showMyBusinessPage = (business) => {

        this.setState({
            showMyBusinessPageModal:true,
            userBusiness:business
        });

        


    }

    hideModal = () => {

        this.setState({
            showNewBusinessFormModal:false,
            showMyBusinessPageModal:false
        });

    };

    componentDidMount (){
        console.log('getting business data')
        axios.get(`http://localhost:8080/api/business/`+this.props.user._id)
        .then((res)=>{
            console.log(res.data)
            this.setState({
                userBusinesses:res.data,
                isLoading: false
            })
    
        });

        
    }


    render() {

        if(this.state.isLoading){
            return <div>is loading...</div>
        }

        const showHideClassName =this.props.showBusinessLoginModal ? "modal display-block" : "modal display-none";

        const userBusinesses=this.state.userBusinesses;
        
        return(
            <div className={showHideClassName}>
                <section className="modal-main" >
                <div className="top-right-div">
                     <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                </div>
                <h6 className="modal-header">Business Login</h6>

                <div>
                    <button className="greyButton" onClick={this.showNewBusinesForm}>Register New Business</button>
                    <h6>Your accounts</h6>

<div className="centered-container">
<section className="horizontal-scroll-div">
{(userBusinesses != null) ?
userBusinesses.map((business)=>(
    <div className="cardView" key={business._id} onClick={()=>this.showMyBusinessPage(business)}>
           
            <h5>{business.businessName}</h5>
       </div>
))

:
<div></div>

}

</section>
                </div>

           

        </div>


    
                </section>

                <NewBusinessForm user={this.props.user} showNewBusinessFormModal={this.state.showNewBusinessFormModal} handleClose={this.hideModal}/>

                <MyBusinessPage userBusiness={this.state.userBusiness} showMyBusinessPageModal={this.state.showMyBusinessPageModal} handleClose={this.hideModal}/>

                
            </div>
        );
    }
}

export default RegisterBusiness;