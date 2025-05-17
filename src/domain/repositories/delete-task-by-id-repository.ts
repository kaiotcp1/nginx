export interface DeleteTaskByIdRepository {
  deleteTaskById(id: string): Promise<boolean | null>;
}