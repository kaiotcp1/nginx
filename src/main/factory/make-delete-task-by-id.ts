import { MongoDeleteTaskById } from "../../infrastructure/database/mongo/repositories/delete-task-by-id/mongo-delete-task-by-id";
import { DeletTaskByIdController } from "../../infrastructure/http/controller/delete-task.controller";
import { DeleteTaskByIdUseCase } from "../../application/use-cases/delete-task/delete-task-by-id";
import { DeleteTaskPresenter } from "../../infrastructure/http/presenters/delete-task-presenter";

export function deleteTaskById() {
  const repository = new MongoDeleteTaskById();
  const useCase = new DeleteTaskByIdUseCase(repository);
  const presenter = new DeleteTaskPresenter();
  const controller = new DeletTaskByIdController(useCase, presenter);
  return controller;
};