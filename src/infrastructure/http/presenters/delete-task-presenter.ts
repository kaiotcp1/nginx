import { Presenter } from "../../../contracts/presenter";

export class DeleteTaskPresenter implements Presenter<DeleteTaskResponseDTO> {
  toHTTP(data: DeleteTaskResponseDTO) {
    return {
      message: data.message,
    };
  }
}
