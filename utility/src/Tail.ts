export type Tail<Tuple extends any[]> = Tuple extends [any, ...infer Tail] ? Tail : [];
