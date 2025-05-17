import { FindAllTasksUseCaseInterface } from '../../../domain/usecases/list-all-taks-usecase';
import { ListTasksPresenter } from '../presenters/list-task-presenter';
import { HTTPRequest, HTTPResponse } from '../../../contracts/http';
import { TaskViewModel } from '../presenters/task-view-model';
import { Controller } from '../../../contracts/controller';
import { errorAdapter } from '../helpers/error-adapter';
import { ok } from '../helpers/http-helpers';

export class ListAllTasksController implements Controller {
  constructor(
    private readonly useCase: FindAllTasksUseCaseInterface,
    private readonly presenter: ListTasksPresenter
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    try {
      const tasks = await this.useCase.execute();
      const result = tasks.map(TaskViewModel.toHTTP);
      return ok(this.presenter.toHTTP(result));
    } catch (err) {
      return errorAdapter(err);
    };
  };
};
