import productsRouter from '@modules/products/routes/products.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/usersSession.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
