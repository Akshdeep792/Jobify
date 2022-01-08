const User = require('../models/Job');

const getAllJob = async (req,res) => {
    res.send("Get all jobs")
}
const getJob = async (req,res) => {
    res.send("Get job")
}
const createJob = async (req,res) => {
    res.send("Create jobs")
}
const updateJob = async (req,res) => {
    res.send("update jobs")
}
const deleteJob = async (req,res) => {
    res.send("Delete jobs")
}


module.exports = {
    getAllJob,
    getJob,
    createJob,
    updateJob,
    deleteJob
}