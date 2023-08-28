import { type Application, type Router } from 'express';
import { ProductRouter } from './products';

const _routes: Array<[string, Router]> = [['/product', ProductRouter]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
