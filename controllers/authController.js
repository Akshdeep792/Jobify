import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import {BadRequestError} from '../errors/index.js'
// require('express-async-errors')



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
        const token  = user.createJWT();
        res.status(StatusCodes.OK).json({user : {
            email : user.email,
            lastName: user.lastName,
            location : user.location,
            name: user.name
        }, token, location : user.location});
}

const login = async (req,res) => {
    res.send("Login User")

}

const updateUser = async (req,res) => {
    res.send("Update User")

}

export {register, login, updateUser}