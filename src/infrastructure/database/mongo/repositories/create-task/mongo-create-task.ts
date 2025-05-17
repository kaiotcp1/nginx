import { CreateTaskRepository } from "../../../../../domain/repositories/create-task-repository";
import { Task } from "../../../../../domain/entities/task";
import { getDb } from "../../mongo-client";
import { ObjectId } from "mongodb";

export class MongoCreateTask implements CreateTaskRepository {
  async create(task: Task): Promise<boolean> {
   const result =  await getDb().collection("tasks").insertOne({
      _id: new ObjectId(),
      title: task.title,
      completed: task.completed, 
    })
    return result.acknowledged;
  };
}