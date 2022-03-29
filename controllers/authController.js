import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import {BadRequestError} from '../errors/index.js'
// require('express-async-errors')
class CustomAPIError extends Error{
    constructor(message){
        super(message)
        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

const register = async (req,res) => {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            throw new BadRequestError('Please Provide All Values')
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            throw new BadRequestError('Email already exists')
        }
        const user = await User.create(req.body);
        res.status(StatusCodes.OK).json({user});
}

const login = async (req,res) => {
    res.send("Login User")

}

const updateUser = async (req,res) => {
    res.send("Update User")

}

export {register, login, updateUser}