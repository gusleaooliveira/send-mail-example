const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const transporter = require('../config/transporter');

module.exports = async function (fastify) {
  fastify.post('/send-email', {
    schema: {
      description: 'Envia um e-mail utilizando um template HTML',
      tags: ['Email'],
      body: {
        type: 'object',
        properties: {
          to: { type: 'string', description: 'Endereço de e-mail do destinatário' },
          subject: { type: 'string', description: 'Assunto do e-mail' },
          templateName: { type: 'string', description: 'Nome do template HTML' },
          templateData: { 
            type: 'object', 
            description: 'Dados para preencher o template',
            additionalProperties: true
          }
        },
        required: ['to', 'subject', 'templateName', 'templateData']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            info: { type: 'object', additionalProperties: true }
          }
        },
        500: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { to, subject, templateName, templateData } = request.body;

    try {
      // Carregar e compilar o template HTML
      const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const htmlContent = compiledTemplate(templateData);

      // Configurar e-mail
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent
      };

      // Enviar e-mail
      const info = await transporter.sendMail(mailOptions);

      reply.send({ success: true, message: 'E-mail enviado!', info });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ success: false, message: 'Erro ao enviar e-mail.', error: error.message });
    }
  });
};
