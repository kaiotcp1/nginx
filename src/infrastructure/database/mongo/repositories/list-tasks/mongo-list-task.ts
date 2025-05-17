import { ListTasksRepository } from "../../../../../domain/repositories/list-tasks-repository";
import { Task } from "../../../../../domain/entities/task";
import { getDb } from "../../mongo-client";

export class MongoListTasks implements ListTasksRepository {
  
  async list(): Promise<Task[]> {
    const docs = await getDb().collection("tasks").find({}).toArray();
    console.log(docs)
    return docs.map((doc) => ({
      id: doc._id.toHexString(),
      title: doc.title,
      completed: doc.completed,
    }));
  };
}