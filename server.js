require('dotenv').config(); // Carregar variáveis de ambiente
const fastify = require('fastify')({ logger: true });
const emailRoutes = require('./routes/email');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUI = require('@fastify/swagger-ui');

// Configurar o Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Email Service API',
      description: 'API para envio de e-mails com templates HTML',
      version: '1.0.0'
    },
    host: `localhost:${process.env.PORT || 3000}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

// Adicionar UI do Swagger
fastify.register(fastifySwaggerUI, {
  routePrefix: '/docs', // Rota para acessar a interface Swagger
  swagger: {
    info: {
      title: 'Email Service API',
      version: '1.0.0'
    }
  },
  exposeRoute: true
});

// Registrar rotas
fastify.register(emailRoutes, { prefix: '/api' });

// Inicializar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    fastify.log.info(`Servidor rodando em http://localhost:${process.env.PORT}`);
    fastify.log.info(`Documentação Swagger disponível em http://localhost:${process.env.PORT || 3000}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
