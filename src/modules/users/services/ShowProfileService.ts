import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { appendFile } from 'fs';
import AppError from '@shared/errors/AppError';

interface IRequest {
  userId: string;
}

export default class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
