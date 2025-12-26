import { User } from '@root/domain/user.domain';

export class UserRepository {
  private users: User[] = [];

  public async createUser(user: User): Promise<void> {
    this.users.push(user);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
