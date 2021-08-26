const sgMail = require("@sendgrid/mail");
const MailTemplate = require('../../model/mail_template')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailWithTemplate =  async (message) => {
  try {
    const template = await MailTemplate.findById(message.templateId)
    const response = await sendMail({...message, templateId: template.template_id})
    return response
  } catch (error) {
    __logger.error(`failed to send mail to id: ${message.to} :: ${error}`)
    throw error
  }
}

const sendMail = async (message) => {
  return new Promise((resolve, reject) => {
    sgMail.send(message).then(
      (data) => {
        __logger.info(`mail sent to the address ${message.to}`);
        resolve(data);
      },
      (error) => {
        __logger.error(`mail failed to sent to the address ${message.to}`);
        reject(error);
      }
    );
  });
};
module.exports = {
  sendMail,
  sendMailWithTemplate
};
