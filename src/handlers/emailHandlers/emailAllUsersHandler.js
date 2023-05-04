const { User } = require('../../db');
const { transporter } = require('../../utils/mailer');
const fs = require('fs');
const handlerbars = require('handlebars');
const path = require('path');
const util = require('util');

const emailAllUsersHandler = async (req, res) => {
  console.log('emailAllUsersHandler');
  const { subject, text } = req.body;
  const users = await User.findAll();
  const emails = users.map((user) => user.mail);

  const readFile = util.promisify(fs.readFile);
  const templateFile = await readFile(
    path.resolve(__dirname, '../../views/emailAllUser.handlebars'),
    'utf8'
  );
  const template = handlerbars.compile(templateFile);
  const html = template({ text });

  const mailOptions = {
    from: 'the.chocolate.hub@outlook.com',
    to: emails,
    subject: subject,
    text: html,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).send('Emails sent successfully');
};
module.exports = { emailAllUsersHandler };
