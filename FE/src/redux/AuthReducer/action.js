import { CREATE_USER_SUCCESS, CREATE_USER_REQUEST, CREATE_USER_ERROR } from "./actionTypes";

import axios from 'axios';
const URL = 'http://localhost:3000'
export const Register = (data) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST })
    await axios.post(`${URL}/user/register`, data,)
        .then((res) => {
            dispatch({ type: CREATE_USER_SUCCESS, payload: res });
            localStorage.setItem('token', res.data.token)
        })
        .catch((error) => {
            dispatch({ type: CREATE_USER_ERROR })
            console.log(error);
        })
}
export const Login = ({ user, email }) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST })
    await axios.post(`${URL}/user/register`, { user, email })
        .then((res) => {
            dispatch({ type: CREATE_USER_SUCCESS, payload: res });
            localStorage.setItem('token', res.data.token)
        })
        .catch((error) => {
            dispatch({ type: CREATE_USER_ERROR })
            console.log(error);
        })
}

