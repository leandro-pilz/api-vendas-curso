import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.auth,
);

export default sessionsRouter;
