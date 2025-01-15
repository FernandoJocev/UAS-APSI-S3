import { Injectable } from '@nestjs/common';

export interface UserInterface {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

@Injectable()
export class TestUsersService {
  private readonly users = [
    {
      id: 1,
      name: 'User 1',
      email: 'example1@gmail.com',
      password: '12345678',
      role: 'user',
    },

    {
      id: 2,
      name: 'User 2',
      email: 'example2@gmail.com',
      password: '12345678',
      role: 'user',
    },

    {
      id: 3,
      name: 'User 3',
      email: 'example3@gmail.com',
      password: '12345678',
      role: 'user',
    },

    {
      id: 4,
      name: 'Peradminan Duniawi',
      email: 'admin@gmail.com',
      password: 'GGgemink',
      role: 'admin',
    },
  ];

  async findOne(email: string): Promise<UserInterface | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
