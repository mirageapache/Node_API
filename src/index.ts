import 'dotenv/config';
import fastify from 'fastify';

const server = fastify({ logger: true });

// 註冊路由
server.get('/test', async () => {
  return { 'message': 'get test success' };
});

// 啟動伺服器
const start = async () => {
  try {
    await server.listen({ 
      port: Number(process.env.PORT), 
      host: process.env.HOST 
    });
    server.log.info(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 