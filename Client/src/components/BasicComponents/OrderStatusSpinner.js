import React, {Component} from 'react';


class OrderStatusSpinner extends Component{

  
    constructor(props) {
        super(props);
        this.state={
        
            showOrderStatusSpinnerMenu:false,
            orderStatus:'All'
        }
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.orderStatusSelected=this.orderStatusSelected.bind(this);
    }


    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ showOrderStatusSpinnerMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });

        console.log('shown');
      }
    
      hideDropdownMenu() {
        this.setState({ showOrderStatusSpinnerMenu: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
        console.log('hide');
      }

      orderStatusSelected (params){
            this.props.selectedOrderStatus(params);

            this.setState({
                orderStatus:params
            });
            
      }


      render(){
          return (
              <div className="order-status-spinner">
                    <div className="spinner-button" onClick={this.showDropdownMenu}><p>{this.state.orderStatus} <i className="arrow down"></i></p></div>
                            
                            {this.state.showOrderStatusSpinnerMenu ? (
                                
                                <div className="spinner-dropdown-list">
                                    
                                <button className="dropdown_menuItem" onClick={()=> this.orderStatusSelected('Pending')}>Pending</button>
                                <button className="dropdown_menuItem" onClick={()=> this.orderStatusSelected('Confirmed')}>Confirmed</button>
                                <button className="dropdown_menuItem" onClick={()=> this.orderStatusSelected('Ready')}>Ready</button>
                                <button className="dropdown_menuItem" onClick={()=> this.orderStatusSelected('Delivered')}>Delivered</button>
                                <button className="dropdown_menuItem" onClick={()=> this.orderStatusSelected('Rejected')}>Rejected</button>
                                <button className="dropdown_menuItem" onClick={()=> this.orderStatusSelected('All')}>All</button>
                               </div>
                            ):(
                                null
                            )}
              </div>
          );
      }
}

export default OrderStatusSpinner;
