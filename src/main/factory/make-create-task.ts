import { MongoCreateTask } from "../../infrastructure/database/mongo/repositories/create-task/mongo-create-task";
import { CreateTaskController } from "../../infrastructure/http/controller/create-task.controller";
import { CreateTaskPresenter } from "../../infrastructure/http/presenters/create-task-presenter";
import { CreateTaskUseCase } from "../../application/use-cases/create-task/create-task";

export function makeCreateTask() {
  const repository = new MongoCreateTask();
  const useCase = new CreateTaskUseCase(repository);
  const presenter = new CreateTaskPresenter();
  const controller = new CreateTaskController(useCase, presenter);
  return controller;
};