import * as actionTypes from './actionTypes';

export const Leaders=(state={
    isLoading:true,
    err:null,
    leaders:[]
},action)=>{
    switch(action.type){
        case actionTypes.ADD_LEADERS:
            return{...state,isLoading:false,err:null,leaders:action.value};
        case actionTypes.LEADERS_LOADING:
            return{...state,isLoading:true,err:null,leaders:[]};
        case actionTypes.LEADERS_FAILED:
            return{...state,isLoading:false,err:action.value,leaders:[]};
        default:
            return state;
    }
}