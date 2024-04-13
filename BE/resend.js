const { Resend } = require('resend');
require('dotenv').config()
const resend = new Resend('re_93bmbaPy_BVoQVe8qvJVarUExk4PXARtj');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'cocc1274@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});