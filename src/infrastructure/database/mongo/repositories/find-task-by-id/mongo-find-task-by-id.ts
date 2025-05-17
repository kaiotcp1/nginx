import { FindTaskByIdRepository } from '../../../../../domain/repositories/find-taskby-id-repository'
import { Task } from '../../../../../domain/entities/task'
import { getDb } from '../../mongo-client'
import { ObjectId } from 'mongodb'

export class MongoFindTaskById implements FindTaskByIdRepository {
  
  async findById(id: string): Promise<Task | null> {
      const doc = await getDb().collection('tasks').findOne({ _id: new ObjectId(id) })
      if (!doc) return null

      return {
        id: doc._id.toHexString(),
        title: doc.title,
        completed: doc.completed
      }
  }
}
