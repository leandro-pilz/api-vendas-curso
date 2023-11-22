import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export default class UpdateProfileService {
  public async execute({ userId, name, email, password, oldPassword }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userUpdateEmail = await userRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already one user with this email.', 409);
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password is incorrect.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}
