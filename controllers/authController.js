import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'

const register = async (req,res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(StatusCodes.OK).json({user});
    } catch (err) {
        // res.status(500).json({msg : err.msg})
        next(err);
    }
        
}

const login = async (req,res) => {
    res.send("Login User")

}

const updateUser = async (req,res) => {
    res.send("Update User")

}

export {register, login, updateUser}