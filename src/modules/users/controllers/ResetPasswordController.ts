import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordService = new SendForgotPasswordEmailService();

    await sendForgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}
