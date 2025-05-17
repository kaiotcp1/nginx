import { CreateTaskUseCase } from "../../../application/use-cases/create-task/create-task";
import { CreateTaskDTO } from "../../../application/dtos/create-task-dto";
import { CreateTaskPresenter } from "../presenters/create-task-presenter";
import { HTTPRequest, HTTPResponse } from "../../../contracts/http";
import { Controller } from "../../../contracts/controller";
import { errorAdapter } from "../helpers/error-adapter";
import { created } from "../helpers/http-helpers";

export class CreateTaskController implements Controller
{
  constructor(
    private useCase: CreateTaskUseCase,
    private readonly presenter: CreateTaskPresenter
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    try {
      const dto = request.body as CreateTaskDTO;
      const result  = await this.useCase.execute(dto);
      return created(this.presenter.toHTTP(result));
    } catch (err) {
      return errorAdapter(err);
    };
  };
};
