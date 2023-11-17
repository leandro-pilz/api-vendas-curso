import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/usersSession.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);

export default routes;
