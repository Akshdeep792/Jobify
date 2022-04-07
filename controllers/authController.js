import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, UnAuthenticatedError} from '../errors/index.js'
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
        res.status(StatusCodes.CREATED).json({user : {
            email : user.email,
            lastName: user.lastName,
            location : user.location,
            name: user.name
        }, token, location : user.location});
}

const login = async (req,res) => {
    
    const {email, password} = req.body;

    if(!email ||!password){
        throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isCorrectPassword = await user.comparePassword(password);
    if(!isCorrectPassword){
        throw new UnAuthenticatedError('Incorrect Password');
    }
    const token = user.createJWT();
    user.password = undefined
    res.status(StatusCodes.OK).send({user, token, location : user.location})

}

const updateUser = async (req,res) => {
    console.log(req.user)
    res.send("Update User")

}

export {register, login, updateUser}