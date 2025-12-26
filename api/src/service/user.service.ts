import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@root/domain/user.domain';
import { UserRepository } from '@root/repository/user.repository';
import { hash } from 'bcrypt';

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  public async createUser(params: CreateUserParams): Promise<string> {
    const userExists = await this.userRepository.getUserByEmail(params.email);

    if (userExists) {
      throw new BadRequestException('User with this email already exists.');
    }

    const hashedPassword = await hash(params.password, 10);

    const newUser = new User({
      username: params.username,
      email: params.email,
      password: hashedPassword,
    });

    await this.userRepository.createUser(newUser);
    return newUser.id;
  }

  public async getStatus(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }
}
