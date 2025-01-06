import { Injectable } from '@nestjs/common';

export interface UserInterface {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class TestUsersService {
  private readonly users = [
    {
      id: 1,
      name: 'User 1',
      email: 'example1@gmail.com',
      password: '12345678',
    },

    {
      id: 2,
      name: 'User 2',
      email: 'example2@gmail.com',
      password: '12345678',
    },

    {
      id: 3,
      name: 'User 3',
      email: 'example3@gmail.com',
      password: '12345678',
    },
  ];

  async findOne(email: string): Promise<UserInterface | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
