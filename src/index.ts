import 'dotenv/config';
import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes';
import pool from './config/database';

const server = fastify({ logger: true });

// 測試資料庫連接
const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

// 註冊路由
server.register(userRoutes, { prefix: '/api' });

// 啟動伺服器
const start = async () => {
  try {
    // 測試資料庫連接
    await testDbConnection();
    
    // 啟動伺服器
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