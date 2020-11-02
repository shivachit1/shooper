import axios from 'axios';
import { createBrowserHistory } from 'history';
import { SIGN_IN,SIGN_OUT,UPDATE_USER } from './types';


const history = createBrowserHistory();
export const loggedUser = () => dispatch => {
     console.log('signing user');
     
        axios({
            method: 'get', //you can set what request you want to be
            url: 'api/auth/user'
          }).then((res)=>{
            if(res.data!==""){
                dispatch({
                    type:SIGN_IN,
                    payload:{
                        user:res.data
                    }
                })
                history.push('/mapView');
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


export const signOutUser = () => dispatch => {
    console.log('Logging Out user');
   
       axios({
           method: 'get', //you can set what request you want to be
           url: 'api/auth/logout'
         }).then((res)=>  dispatch({
             type:SIGN_OUT,
             payload:{
                user:null
            }
         }));
   
}

export const updateUser = (user) => dispatch => {
    console.log('Updating user');
   
       axios.post(`/api/auth/user/${user._id}`,user)
       .then((res)=>  dispatch({
             type:UPDATE_USER,
             payload:{
                user:res.data
            }
         }));
   
}