const { Resend } = require('resend');
require('dotenv').config()
const resend = new Resend(`${process.env.RESEND_API_KEY}`);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'cocc1274@gmail.com',
  subject: 'Hello USER',
  html: `<p>${process.env.Message}</p>`
});