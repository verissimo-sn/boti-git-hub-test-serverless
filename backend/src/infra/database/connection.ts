export default interface IConnection<T> {
  connect(): Promise<T>;
  disconnect(): Promise<void>;
}
