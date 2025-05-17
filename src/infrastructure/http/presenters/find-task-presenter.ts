import { Presenter } from '../../../contracts/presenter';
import { Task } from '../../../domain/entities/task';

export class FindTaskByIdPresenter implements Presenter<Task> {
  toHTTP(data: Task) {
    return {
      id: data.id,
      title: data.title,
      completed: data.completed,
    };
  }
}
