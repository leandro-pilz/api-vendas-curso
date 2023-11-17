import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserSevice from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UsersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserSevice();

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }
}
