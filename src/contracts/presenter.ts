export interface Presenter<T> {
  toHTTP(data: T): any;
}