// motoko 结果对象
export type MotokoResult<T, E> = { ok: T; err?: undefined } | { ok?: undefined; err: E };

// rust 结果对象
export type RustResult<T, E> = { Ok: T; Err?: undefined } | { Ok?: undefined; Err: E };
