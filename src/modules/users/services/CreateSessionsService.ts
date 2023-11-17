import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

export default class CreateSessionsSevice {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}
