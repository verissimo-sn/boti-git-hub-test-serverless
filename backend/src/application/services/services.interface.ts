export default interface IService<I, O> {
  execute(input: I): Promise<O>;
}
