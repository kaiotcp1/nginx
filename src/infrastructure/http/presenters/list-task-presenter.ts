// src/presenter/view-models/list-tasks-presenter.ts
import { Presenter } from '../../../contracts/presenter';
import { Task } from '../../../domain/entities/task';

export class ListTasksPresenter implements Presenter<Task[]> {
  toHTTP(data: Task[]) {
    return data.map(task => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
    }));
  }
}
