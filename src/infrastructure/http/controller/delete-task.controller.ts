import { DeleteTaskByIdUseCase } from '../../../application/use-cases/delete-task/delete-task-by-id';
import { DeleteTaskPresenter } from '../presenters/delete-task-presenter';
import { HTTPRequest, HTTPResponse } from '../../../contracts/http';
import { Controller } from '../../../contracts/controller';
import { errorAdapter } from '../helpers/error-adapter';
import { deleted } from '../helpers/http-helpers';

export class DeletTaskByIdController implements Controller {
  constructor(
    private readonly useCase: DeleteTaskByIdUseCase,
    private readonly presenter: DeleteTaskPresenter
  ) {}

  async handle(request: HTTPRequest): Promise<HTTPResponse> {
    try {
      const { id } = request.params!;
      const result = await this.useCase.execute(id);
      return deleted(this.presenter.toHTTP(result));
    } catch (err) {
      return errorAdapter(err);
    };
  };
};
