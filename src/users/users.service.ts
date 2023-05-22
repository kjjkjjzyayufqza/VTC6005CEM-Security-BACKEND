import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'string',
      password: 'string',
      refreshToken: 'string'
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      refreshToken: 'string'
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
