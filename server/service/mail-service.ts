import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class MailService {
  private transporter: Transporter;
  constructor() {

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to: any, link: any) {
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

  async sendResetMail(to: any, password: any) {
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

export = new MailService();
