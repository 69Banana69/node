import express, { Request, Response, NextFunction } from 'express';

import menuRouter from './resources/menus/menu.router';
import categoryRouter from './resources/categorys/category.router';
import dishRouter from './resources/dishs/dish.router';

import { notFound, successHttpLogger, errorHttpLogger, errorLogger } from './middleware';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(successHttpLogger);
app.use(errorHttpLogger);

app.use('/menus', menuRouter);
app.use('/categorys', categoryRouter);
app.use('/dishs', dishRouter);

app.use(notFound);
app.use(errorLogger);

export default app;