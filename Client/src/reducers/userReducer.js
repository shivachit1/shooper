import {SIGN_IN, SIGN_OUT,UPDATE_USER} from '../actions/types';

const initialState = {
    user:null
}

const userReducer = (state = initialState, action) => {
   
    
    switch (action.type){
        case SIGN_IN:
        return {
            user:action.payload.user
            
        };

        case UPDATE_USER:
        return {
            user:action.payload.user
        };

        case SIGN_OUT:
        return {
            user:action.payload.user
        };

        

        default:
        return state;
    }

}

export default userReducer;