const nodemailer = require('nodemailer');

// Configurar o transporte para o Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usando o serviço Gmail
  auth: {
    user: process.env.EMAIL_USER, // E-mail do remetente
    pass: process.env.EMAIL_PASS  // Senha ou senha de aplicativo
  }
});

// Testar a conexão com o serviço
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar com o serviço de e-mail:', error);
  } else {
    console.log('Serviço de e-mail conectado com sucesso!');
  }
});

module.exports = transporter;
