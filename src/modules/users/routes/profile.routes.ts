import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.getById);

profileRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')).when('password', { is: Joi.exist(), then: Joi.required() }),
      oldPassword: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
