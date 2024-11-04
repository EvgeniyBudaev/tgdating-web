export type TApiFunction<TParams, TResponse> = (
  params: TParams,
  options?: Record<string, any>,
) => Promise<TResponse>;
