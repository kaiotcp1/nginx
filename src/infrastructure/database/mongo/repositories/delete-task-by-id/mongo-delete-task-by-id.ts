import { DeleteTaskByIdRepository } from '../../../../../domain/repositories/delete-task-by-id-repository'
import { getDb } from '../../mongo-client'
import { ObjectId } from 'mongodb'

export class MongoDeleteTaskById implements DeleteTaskByIdRepository {
  
  async deleteTaskById(id: string): Promise<boolean | null> {
      const doc = await getDb().collection('tasks').findOne({ _id: new ObjectId(id) })
      if (!doc) return null

      return await getDb().collection('tasks').deleteOne({ _id: new ObjectId(id) })
      .then((result) => {
        if (result.deletedCount === 1) {
          return true
        } else {
          return false
        }
      });
  }
}
