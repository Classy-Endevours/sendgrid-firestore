const { REGISTRATION, PAGE_VISIT } = require("./config")
const { sendMailWithTemplate } = require("./mail")

const registrationMail = async (email) => {
    const input = {
        to: email,
        from: 'noreply@propertyloop.co.uk',
        templateId: REGISTRATION
    }
    await sendMailWithTemplate(input)
}
const pageVisitMail = async (email) => {
    const input = {
        to: email,
        from: 'noreply@propertyloop.co.uk',
        templateId: PAGE_VISIT
    }
    await sendMailWithTemplate(input)
}

module.exports = {
    registrationMail,
    pageVisitMail
}