import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();

  // 獲取所有用戶
  fastify.get('/users', userController.getAllUsers);

  // 獲取特定用戶
  fastify.get('/users/:id', userController.getUserById);

  // 創建用戶
  fastify.post('/users', userController.createUser);

  // 更新用戶
  fastify.put('/users/:id', userController.updateUser);

  // 刪除用戶
  fastify.delete('/users/:id', userController.deleteUser);
} 