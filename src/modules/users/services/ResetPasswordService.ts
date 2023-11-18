import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRespository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRespository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists.', 404);
    }

    const compareDate = addHours(userToken.createdAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 400);
    }

    const user = await userRepository.findById(userToken.id);
    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    user.password = await hash(password, 8);
    await userRepository.save(user);
  }
}
