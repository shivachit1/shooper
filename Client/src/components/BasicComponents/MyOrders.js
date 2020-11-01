import  React, {Component} from 'react';
import OrderStatusSpinner from './OrderStatusSpinner';
import axios from 'axios'

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state={
            showModal:true,
            showOrderStatusSpinnerMenu:false,
            selectedStatus:"all",
            tempOrders:[],
            myOrders:[],
            isLoading:true
        }
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.selectedOrderStatus=this.selectedOrderStatus.bind(this);
        this.trackOrder =this.trackOrder.bind(this);
        this.viewOrderDetails=this.viewOrderDetails.bind(this);
    }

    showDropdownMenu=(event) =>{
        event.preventDefault();
        this.setState({ showModal: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });

        console.log('shown');
      }
    
      hideDropdownMenu=() =>{
        this.setState({ showModal: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
        console.log('hide');
      }

      selectedOrderStatus=(params)=>{

        let fileredItems = this.state.myOrders;
        
        if(params==='All'){
            
        }
        else{
            fileredItems = this.state.myOrders.filter((item) => item.status === params ? true : false);
        }
            
        this.setState({selectedStatus:params});

        console.log(params);
        this.setState({tempOrders:fileredItems});

      }


      trackOrder =(orderID)=>{
          console.log('track Order of :'+orderID);
      }

      viewOrderDetails=(orderID)=>{
          console.log('view order details of :'+orderID);
      }


      componentDidMount (){
        axios.get('http://localhost:8080/api/orders/'+this.props.user._id).then((res)=>{
            
        this.setState({
            myOrders:res.data,
            tempOrders:res.data,
            isLoading:false
        })

        });
    }
    
    
    render(){

        const showHideClassName =this.props.showMyOrdersModal ? "modal display-block" : "modal display-none";
        console.log('myorders');
        
        if(this.state.isLoading){
            return <div className={showHideClassName}>is loading...</div>
        }


        return (
            <div className={showHideClassName}>
            <section className="modal-main" >
                

                <div >
                    <div className="top-right-div">
                    <OrderStatusSpinner selectedOrderStatus={this.selectedOrderStatus}/>
                     <button className="modal-close-button" onClick={this.props.handleClose}>X</button>
                    </div>
               
                <h6 className="modal-header">My Orders</h6>
                
                <div className="business-container">
                    {this.state.tempOrders.map(order => (
                       
                        <div key={order._id} className="product-div">
                        <p className="title">{order.status}</p>
                        
                         <p className="price-tag">{order.totalPrice}€</p>
                        
                         <div className="center">
                         
                        <button className="delete-button" onClick={(event)=>this.viewOrderDetails(order._id)}>View Details</button>
                        <button className="edit-button" onClick={(event)=>this.trackOrder(order._id)}>Track Order</button>
                        </div>
                        </div>

                    
                            ))}
                    </div>
                </div>
               
            </section>
        </div>
        );
    }
    
  };

 

export default MyOrders;