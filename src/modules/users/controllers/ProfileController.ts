import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async getById(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ userId });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({ userId, name, email, password, oldPassword });

    return response.json(user);
  }
}
