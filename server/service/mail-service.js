const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
var fs = require('fs');

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to, link) {
    const context = { a: link };

    let html = fs.readFileSync(__dirname + '/template/verification.html', 'utf8')
    let template = handlebars.compile(html);
    let htmlToSend = template(context);

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Confirm your Noisli account!',
      text: '',
      html: htmlToSend
    })
  }

  async sendResetMail(to, password) {
    const context = { a: password };

    let html = fs.readFileSync(__dirname + '/template/reset.html', 'utf8')
    let template = handlebars.compile(html);
    let htmlToSend = template(context);

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Password reset of your Noisli account',
      text: '',
      html: htmlToSend
    })
  }
}

module.exports = new MailService();
