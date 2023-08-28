Express is Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/). This framework is usually used for Backend as API. This article will explain how to create a REST API with Express. The language will use is typescript, because type-safety.

In this article, we will learn how to setup Express with Typescript, routing to get API endpoint, and try our API on Postman. we don't connect to database now, but just call API and get response. 

# Requirement
- NodeJs, version: minimum 14.17 or later. I recommend latest.
- Postman for API calls 

# Setup Node and Typescript

1. Open Terminal and type
```
npm init
```

Then, fill what is displayed afterwards.
![[npm-init-install.png]]


2. Install Typescript
```
npm i -D typescript ts-node
```
This is will be install as DevDependencies Package, which only needed for local development and testing.

![[install-typescript.png]]

3. Install Nodemon
```
npm i nodemon
```
Nodemon help us by automatically restarting the node application when file changes in the directory are detected. then we create "nodemon.json" on root folder. Open your Code editor
```
{
	"watch": ["src"],
	"ext": "ts",
	"exec": "npx ts-node ./src/index.ts"
}
```
so, "watch" instruct nodemon just read src folder. "ext" just read file with .ts extension. "exec" intruct how to execution file (we can use "npx ts-node ./src/index.ts" manually in terminal).

![[install-nodemon.png]]

4. create tsconfig.json
```
npx tsc --init
```
this command will create 'tsconfig.json', like the picture below. This file is root of our typescript project. It has 100 options to configure it, on the right there is a bit of information. If you want to see more, you can visit: https://www.typescriptlang.org/tsconfig

we use this to tsconfig.json for now
```
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    },
    "resolveJsonModule": true,
    "sourceMap": true,
    "outDir": "build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules/**/*"]
}
```
"include" will instruct the typescript for run files .ts in the src folder. "exclude" will instruct typescript to not run files in the node_modules folder.

![[init-tsc.png]]

5. Go to package.json file, find "script" option
```
"script": {
	"start": "npx tsc -w"
	"dev": "npx nodemon"
	"build": "tsc"
}
```

![[script-package.png]]

6. Go to terminal, and now we setup Express
```
npm i express
npm i -D @types/express
```
we need install @types/express for typescript

![[express-package 1.png]]

7. create folder src and create index.ts
```
import express, {Application, Request, Response, NextFunction} from "express";

const app: Application = express();
const port: Number = 4000;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
	res.status(400).send({data: "Hello World"});
});

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`))
```
What i like use typescript on express is we can use 'import' instade *const express = require('express')*. {Application, Request, Response, NextFunction} are types that we need use on our project. 

![[indexts.png]]

Now, go to your terminal and start your project.
```
npm run dev
```
and see http://localhost:4000/

![[npmrundev.png]]

# Routing

## Why we need routing?

- in order to clean code
- to easy create API endpoint
- to easy maintenance

## How to Create Routes?

1. Create Folder 'routes' in src folder
2. Create "index.ts" and "products.ts" in routes folder, with following code

**routes/products.ts**
```
import { type Request, type Response, type NextFunction, Router } from 'express'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: true, statusCode: 200, data: [{ msg: you get data product }] })
})
```

**routes/index.ts**
```
import { type Application, type Router } from 'express'
import { ProductRouter } from './products'

const _routes: Array<[string, Router]> = [
  ['/product', ProductRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
```
On _routes variable we fill ['/product', ProductRouter]. This means that when a request is made to "/product", the `ProductRouter` will handle that request.

3. On "src/index.ts", we change code like this

```
import express, { type Application } from 'express'
import { routes } from './routes'

const app: Application = express()
const port: number = 4000

routes(app)

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`))
```

now, you can check on postman by create request and fill http://localhost:4000/product with GET request, then click SEND. like picture below

![[getpostman.png]]

This is READ request on CRUD 
# Create, Read, Update, Delete (CRUD)

Add more code to 'src/routes/products' to finish our project. for Create, we use POST request. PATCH request for Update and DELETE request for Delete. 

```
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
```

check on Postman.

![[updateproduct.png]]

Now, you can call CRUD request and get Response from it. 