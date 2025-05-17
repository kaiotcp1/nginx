export interface CreateTaskResponseDTO {
  message: string;
  task: {
    title: string;
    completed: boolean;
  };
}
