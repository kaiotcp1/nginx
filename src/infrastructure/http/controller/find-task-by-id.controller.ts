import { FindTaskByIdUseCaseInterface } from '../../../domain/usecases/find-task-by-id-usecase';
import { FindTaskByIdPresenter } from '../presenters/find-task-presenter';
import { HTTPRequest, HTTPResponse } from '../../../contracts/http';
import { Controller } from '../../../contracts/controller';
import { errorAdapter } from '../helpers/error-adapter';
import { ok } from '../helpers/http-helpers';

export class FindTaskByIdController implements Controller {
  constructor(
    private readonly useCase: FindTaskByIdUseCaseInterface,
    private readonly presenter: FindTaskByIdPresenter
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    try {
      const { id } = request.params!;
      const result = await this.useCase.execute(id);
      return ok(this.presenter.toHTTP(result));
    } catch (err) {
      return errorAdapter(err);
    };
  };
};
