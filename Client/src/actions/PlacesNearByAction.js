import axios from 'axios';

import { GET_All_BUSINESS } from './types';



export const loggedUser = () => dispatch => {
     console.log('signing user');
     
        axios({
            method: 'get', //you can set what request you want to be
            url: 'api/auth/business'
          }).then((res)=>{
            if(res.data!==""){
                dispatch({
                    type:GET_All_BUSINESS,
                    payload:{
                        businesses:res.data
                    }
                })
                
            }

          } );
    
}