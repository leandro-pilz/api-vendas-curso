import { Request, Response } from 'express';
import CreateSessionsSevice from '../services/CreateSessionsService';

export default class SessionController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionsService = new CreateSessionsSevice();

    const user = await sessionsService.execute({ email, password });

    return response.json(user);
  }
}
