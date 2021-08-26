const User = require('../model/user');
const { registrationMail, pageVisitMail } = require('../util/mail/mailer');

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
        next(error, req, res, next);
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
        next(error, req, res, next);
    }
}
module.exports = {
    get,
    save
}