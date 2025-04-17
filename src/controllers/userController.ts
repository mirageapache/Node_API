import { FastifyRequest, FastifyReply } from 'fastify';

export class UserController {
  // 模擬資料庫
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  // 獲取所有用戶
  async getAllUsers() {
    return this.users;
  }

  // 獲取單個用戶
  async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = parseInt(request.params.id);
    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }
    
    return user;
  }

  // 創建用戶
  async createUser(request: FastifyRequest<{ Body: { name: string; email: string } }>, reply: FastifyReply) {
    const { name, email } = request.body;
    const newUser = {
      id: this.users.length + 1,
      name,
      email
    };
    
    this.users.push(newUser);
    return reply.status(201).send(newUser);
  }

  // 更新用戶
  async updateUser(request: FastifyRequest<{ 
    Params: { id: string };
    Body: { name?: string; email?: string }
  }>, reply: FastifyReply) {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return reply.status(404).send({ error: 'User not found' });
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      name: name || this.users[userIndex].name,
      email: email || this.users[userIndex].email
    };
    
    return this.users[userIndex];
  }

  // 刪除用戶
  async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = parseInt(request.params.id);
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return reply.status(404).send({ error: 'User not found' });
    }
    
    this.users.splice(userIndex, 1);
    return reply.status(204).send();
  }
} 