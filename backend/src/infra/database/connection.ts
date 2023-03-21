export default interface IConnection<T> {
  connect(): T;
  disconnect(): Promise<void>;
}
