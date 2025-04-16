require('dotenv').config();
const fastify = require('fastify')({ logger: true });

// 註冊路由
fastify.get('/test', async (request, reply) => {
  return { 'message': 'get test success' };
});


// 啟動伺服器
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT, host: process.env.HOST });
    fastify.log.info(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();