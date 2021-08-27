const User = require('../model/user');
require("dotenv").config();
const { registrationMail, pageVisitMail } = require('../util/mail/mailer');
global.__logger = require("../config/logger");

const get = async (req, res, next) => {
    try {
        const users = await User.findAll()
        if(req.query.email){
            await pageVisitMail(req.query.email)
        }
        res.status(200).send({
            users
        })
    } catch (error) {
        __logger.error(`error:: ${error}`)
        res.status(500).send({
            error: error.message,
        })
    }
}
const save = async (req, res, next) => {
    try {
        const user = await User.save(req.body ?? {})
        if(req.body.email){
            await registrationMail(req.body.email)
        }
        __logger.info(`user saved into the application`)
        res.status(200).send({
            user,
        })
    } catch (error) {
        __logger.error(`error:: ${error}`)
        res.status(500).send({
            error: error.message,
        })
    }
}
exports.get = get
exports.save = save
module.exports = {
    get,
    save
}