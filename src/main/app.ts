import express, { json, NextFunction, Request, RequestHandler, Response } from 'express';
import { debugMiddleware } from "../infrastructure/http/middleware/debug-middleware"

import { adaptRoute } from '../infrastructure/http/express-controller-adapter'
import { deleteTaskById } from './factory/make-delete-task-by-id'
import { makeListAllTasks } from './factory/make-list-all-tasks'
import { makeFindTaskById } from './factory/make-find-by-id'
import { makeCreateTask } from './factory/make-create-task'


export const app = express()

app.use(json())
app.use(debugMiddleware)

// rota de health check
const healthCheckHandler: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
};


// 3) Rotas de tarefas em /v1/tasks
app.get('/v1/health', healthCheckHandler);
app.post('/v1/tasks', adaptRoute(makeCreateTask()));
app.get('/v1/tasks',  adaptRoute(makeListAllTasks()));
app.get('/v1/tasks/:id', adaptRoute(makeFindTaskById()));
app.delete('/v1/tasks/:id', adaptRoute(deleteTaskById()));


// 4) 404 handler (rota não encontrada)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next(new Error(`Route ${req.originalUrl} not found`));
});