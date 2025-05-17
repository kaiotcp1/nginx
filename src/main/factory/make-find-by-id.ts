import { MongoFindTaskById } from "../../infrastructure/database/mongo/repositories/find-task-by-id/mongo-find-task-by-id";
import { FindTaskByIdController } from "../../infrastructure/http/controller/find-task-by-id.controller";
import { FindTaskByIdUseCase } from "../../application/use-cases/find-task-by-id/find-task-by-id";
import { FindTaskByIdPresenter } from "../../infrastructure/http/presenters/find-task-presenter";

export function makeFindTaskById() {
  const repository = new MongoFindTaskById();
  const useCase = new FindTaskByIdUseCase(repository);
  const presenter = new FindTaskByIdPresenter();
  const controller = new FindTaskByIdController(useCase, presenter);
  return controller;
};