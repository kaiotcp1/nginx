import { CreateTaskResponseDTO } from '../../../application/dtos/create-task-response-dto';
import { Presenter } from '../../../contracts/presenter';

export class CreateTaskPresenter implements Presenter<CreateTaskResponseDTO> {
  toHTTP(data: CreateTaskResponseDTO) {
    return {
      message: data.message,
      task: {
        title: data.task.title,
        completed: data.task.completed,
      },
    };
  }
}
