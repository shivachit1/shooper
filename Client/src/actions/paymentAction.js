import axios from 'axios';

import { REGISTER_PAYMENT } from './types';



export const registerPayment = () => dispatch => {
     console.log('signing user');
     
        axios({
            method: 'post', //you can set what request you want to be
            url: 'api/payment'
          }).then((res)=>{
            if(res.data!==""){
                dispatch({
                    type:SIGN_IN,
                    payload:{
                        user:res.data
                    }
                })
                
            }
            else{
                dispatch({
                    type:SIGN_IN,
                    payload:{
                        user:null
                    }
                })
            }
          } );
    
}


export const Pay = () => dispatch => {
    console.log('Logging Out user');
   
       axios({
           method: 'post', //you can set what request you want to be
           url: 'api/payment/'+{}
         }).then((res)=>  dispatch({
             type:SIGN_OUT,
             payload:{
                user:null
            }
         }));
   
}