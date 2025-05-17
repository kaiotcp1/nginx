import { MongoListTasks } from "../../infrastructure/database/mongo/repositories/list-tasks/mongo-list-task";
import { ListAllTasksController } from "../../infrastructure/http/controller/list-all-tasks.controller";
import { ListTasksPresenter } from "../../infrastructure/http/presenters/list-task-presenter";
import { ListAllTaskUseCase } from "../../application/use-cases/list-task/list-all-tasks";

export function makeListAllTasks() {
  const repository = new MongoListTasks();
  const useCase = new ListAllTaskUseCase(repository);
  const presenter = new ListTasksPresenter();
  const controller = new ListAllTasksController(useCase, presenter);
  return controller;
};