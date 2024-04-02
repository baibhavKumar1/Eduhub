const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const BlackListModel = require('../Model/blacklist.model');
require('dotenv').config()
const secret = 'secret';

const auth = ({ req })=> {
    let token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
        return req;
    }
    try {
        const { data } = jwt.verify(token, secret);
        req.user = data;
    } catch {
        console.log('Invalid token');
    }
    return req;
}
const signToken= ({ email, password, _id}) =>{
    const payload = {  email, password, _id};

    return jwt.sign({ data: payload }, secret);
}
module.exports = {auth,signToken};