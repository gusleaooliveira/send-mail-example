const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Use `true` para a porta 465, `false` para outras
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificar a conexão com o servidor SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar ao servidor de e-mail:', error);
  } else {
    console.log('Conexão com o servidor de e-mail estabelecida:', success);
  }
});

module.exports = transporter;
