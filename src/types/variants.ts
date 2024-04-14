export type CandidVariant1<A> = Record<string, A>;
export type CandidVariant2<A, B> = Record<string, A | B>;
export type CandidVariant3<A, B, C> = Record<string, A | B | C>;
export type CandidVariant4<A, B, C, D> = Record<string, A | B | C | D>;
export type CandidVariant5<A, B, C, D, E> = Record<string, A | B | C | D | E>;
export type CandidVariant6<A, B, C, D, E, F> = Record<string, A | B | C | D | E | F>;

// 将就着用吧
export type Variant1<A> = Record<string, A | undefined>;
export type Variant2<A, B> = Record<string, A | B | undefined>;
export type Variant3<A, B, C> = Record<string, A | B | C | undefined>;
export type Variant4<A, B, C, D> = Record<string, A | B | C | D | undefined>;
export type Variant5<A, B, C, D, E> = Record<string, A | B | C | D | E | undefined>;
export type Variant6<A, B, C, D, E, F> = Record<string, A | B | C | D | E | F | undefined>;
