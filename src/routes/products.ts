import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from 'express';

export const ProductRouter: Router = Router();

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [{ msg: 'you Read data product' }],
  });
});

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [{ msg: 'you Created data product' }],
  });
});

ProductRouter.patch('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [{ msg: 'you Update data product' }],
  });
});

ProductRouter.delete('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [{ msg: 'you Delete data product' }],
  });
});
