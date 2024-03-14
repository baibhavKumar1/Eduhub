import { CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_SUCCESS } from "./actionTypes"

const init = {
    data:[],
    isLoading:false,
    isError:false,
    token:"",

}

export const reducer = (state=init,{type,payload})=>()=>{
    switch(type){
        case CREATE_USER_REQUEST:return {...state, isLoading:true}
        case CREATE_USER_SUCCESS:return {...state, isLoading:false, token:payload}
        case CREATE_USER_ERROR: return {...state, isLoading:false, isError:true}
    }
}