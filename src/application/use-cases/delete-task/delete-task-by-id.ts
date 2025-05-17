import { DeleteTaskByIdRepository } from '../../../domain/repositories/delete-task-by-id-repository';
import { DeleteTaskByIdUseCaseInterface } from '../../../domain/usecases/delete-task-by-id-usecase';
import { ApplicationError } from '../../../common/errors/application-error';

export class DeleteTaskByIdUseCase implements DeleteTaskByIdUseCaseInterface {
  constructor(private repo: DeleteTaskByIdRepository) {}

  async execute(id: string): Promise<DeleteTaskResponseDTO> {
    const task = await this.repo.deleteTaskById(id);

    if(!task) {
      throw new ApplicationError('Task not found', 404, 'NotFound');
    }

    return { message: 'Task deleted successfully' };
  };
};
