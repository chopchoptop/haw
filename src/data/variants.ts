import {
    CandidVariant1,
    CandidVariant2,
    CandidVariant3,
    CandidVariant4,
    CandidVariant5,
    CandidVariant6,
    Variant1,
    Variant2,
    Variant3,
    Variant4,
    Variant5,
    Variant6,
} from '../types/variants';

// 解包 只取出 key
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unwrapVariantKey = <T extends string>(v: Record<string, any>): T => {
    const keys = Object.keys(v);
    if (keys.length === 0) throw new Error('variant must has a key');
    return keys[0] as T;
};

export const mapping_true = () => true; // 返回 true
export const mapping_false = () => false; // 返回 false
export const unchanging = <T>(t: T): T => t; // 不改变内容
// 处理异常 传入提示信息或者转换错误值
export const throwsBy =
    <E>(s: string | ((e: E) => string)) =>
    (e: E) => {
        if (typeof s === 'string') throw new Error(s);
        throw new Error(s(e));
    };
// 处理异常 解析出枚举错误
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throwsVariantError = (e: Record<string, any>) => {
    const key = unwrapVariantKey(e);
    const message = `${key}${e[key] === null ? '' : `: ${e[key]}`}`;
    throw new Error(message);
};

// 取值
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unwrapVariant = <T>(v: Record<string, any> | undefined, key: string): T | undefined => {
    if (v === undefined) return undefined;
    return v[key];
};

// 解包
export const unwrapVariant1 = <A, AA>(v: CandidVariant1<A>, [k1, f1]: [string, (a: A) => AA]): Variant1<AA> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (v[k1] !== undefined) return { [k1]: f1((v as any)[k1]) };
    throw new Error('variant must has a key');
};
export const unwrapVariant2 = <A, AA, B, BB>(
    v: CandidVariant2<A, B>,
    [k1, f1]: [string, (a: A) => AA],
    [k2, f2]: [string, (b: B) => BB],
): Variant2<AA, BB> => {
    if (v[k1] !== undefined) return { [k1]: f1(v[k1] as A) };
    if (v[k2] !== undefined) return { [k2]: f2(v[k2] as B) };
    throw new Error('variant must has a key');
};
export const unwrapVariant3 = <A, AA, B, BB, C, CC>(
    v: CandidVariant3<A, B, C>,
    [k1, f1]: [string, (a: A) => AA],
    [k2, f2]: [string, (b: B) => BB],
    [k3, f3]: [string, (c: C) => CC],
): Variant3<AA, BB, CC> => {
    if (v[k1] !== undefined) return { [k1]: f1(v[k1] as A) };
    if (v[k2] !== undefined) return { [k2]: f2(v[k2] as B) };
    if (v[k3] !== undefined) return { [k3]: f3(v[k3] as C) };
    throw new Error('variant must has a key');
};
export const unwrapVariant4 = <A, AA, B, BB, C, CC, D, DD>(
    v: CandidVariant4<A, B, C, D>,
    [k1, f1]: [string, (a: A) => AA],
    [k2, f2]: [string, (b: B) => BB],
    [k3, f3]: [string, (c: C) => CC],
    [k4, f4]: [string, (d: D) => DD],
): Variant4<AA, BB, CC, DD> => {
    if (v[k1] !== undefined) return { [k1]: f1(v[k1] as A) };
    if (v[k2] !== undefined) return { [k2]: f2(v[k2] as B) };
    if (v[k3] !== undefined) return { [k3]: f3(v[k3] as C) };
    if (v[k4] !== undefined) return { [k4]: f4(v[k4] as D) };
    throw new Error('variant must has a key');
};
export const unwrapVariant5 = <A, AA, B, BB, C, CC, D, DD, E, EE>(
    v: CandidVariant5<A, B, C, D, E>,
    [k1, f1]: [string, (a: A) => AA],
    [k2, f2]: [string, (b: B) => BB],
    [k3, f3]: [string, (c: C) => CC],
    [k4, f4]: [string, (d: D) => DD],
    [k5, f5]: [string, (e: E) => EE],
): Variant5<AA, BB, CC, DD, EE> => {
    if (v[k1] !== undefined) return { [k1]: f1(v[k1] as A) };
    if (v[k2] !== undefined) return { [k2]: f2(v[k2] as B) };
    if (v[k3] !== undefined) return { [k3]: f3(v[k3] as C) };
    if (v[k4] !== undefined) return { [k4]: f4(v[k4] as D) };
    if (v[k5] !== undefined) return { [k5]: f5(v[k5] as E) };
    throw new Error('variant must has a key');
};
export const unwrapVariant6 = <A, AA, B, BB, C, CC, D, DD, E, EE, F, FF>(
    v: CandidVariant6<A, B, C, D, E, F>,
    [k1, f1]: [string, (a: A) => AA],
    [k2, f2]: [string, (b: B) => BB],
    [k3, f3]: [string, (c: C) => CC],
    [k4, f4]: [string, (d: D) => DD],
    [k5, f5]: [string, (e: E) => EE],
    [k6, f6]: [string, (f: F) => FF],
): Variant6<AA, BB, CC, DD, EE, FF> => {
    if (v[k1] !== undefined) return { [k1]: f1(v[k1] as A) };
    if (v[k2] !== undefined) return { [k2]: f2(v[k2] as B) };
    if (v[k3] !== undefined) return { [k3]: f3(v[k3] as C) };
    if (v[k4] !== undefined) return { [k4]: f4(v[k4] as D) };
    if (v[k5] !== undefined) return { [k5]: f5(v[k5] as E) };
    if (v[k6] !== undefined) return { [k6]: f6(v[k6] as F) };
    throw new Error('variant must has a key');
};

// 解包并映射
export const unwrapVariant1Map = <A, R>(v: CandidVariant1<A>, [k1, f1]: [string, (a: A) => R]): R => {
    if (v[k1] !== undefined) return f1(v[k1] as A);
    throw new Error('variant must has a key');
};
export const unwrapVariant2Map = <A, B, R>(
    v: CandidVariant2<A, B>,
    [k1, f1]: [string, (a: A) => R],
    [k2, f2]: [string, (b: B) => R],
): R => {
    if (v[k1] !== undefined) return f1(v[k1] as A);
    if (v[k2] !== undefined) return f2(v[k2] as B);
    throw new Error('variant must has a key');
};
export const unwrapVariant3Map = <A, B, C, R>(
    v: CandidVariant3<A, B, C>,
    [k1, f1]: [string, (a: A) => R],
    [k2, f2]: [string, (b: B) => R],
    [k3, f3]: [string, (c: C) => R],
): R => {
    if (v[k1] !== undefined) return f1(v[k1] as A);
    if (v[k2] !== undefined) return f2(v[k2] as B);
    if (v[k3] !== undefined) return f3(v[k3] as C);
    throw new Error('variant must has a key');
};
export const unwrapVariant4Map = <A, B, C, D, R>(
    v: CandidVariant4<A, B, C, D>,
    [k1, f1]: [string, (a: A) => R],
    [k2, f2]: [string, (b: B) => R],
    [k3, f3]: [string, (c: C) => R],
    [k4, f4]: [string, (d: D) => R],
): R => {
    if (v[k1] !== undefined) return f1(v[k1] as A);
    if (v[k2] !== undefined) return f2(v[k2] as B);
    if (v[k3] !== undefined) return f3(v[k3] as C);
    if (v[k4] !== undefined) return f4(v[k4] as D);
    throw new Error('variant must has a key');
};
export const unwrapVariant5Map = <A, B, C, D, E, R>(
    v: CandidVariant5<A, B, C, D, E>,
    [k1, f1]: [string, (a: A) => R],
    [k2, f2]: [string, (b: B) => R],
    [k3, f3]: [string, (c: C) => R],
    [k4, f4]: [string, (d: D) => R],
    [k5, f5]: [string, (e: E) => R],
): R => {
    if (v[k1] !== undefined) return f1(v[k1] as A);
    if (v[k2] !== undefined) return f2(v[k2] as B);
    if (v[k3] !== undefined) return f3(v[k3] as C);
    if (v[k4] !== undefined) return f4(v[k4] as D);
    if (v[k5] !== undefined) return f5(v[k5] as E);
    throw new Error('variant must has a key');
};
export const unwrapVariant6Map = <A, B, C, D, E, F, R>(
    v: CandidVariant6<A, B, C, D, E, F>,
    [k1, f1]: [string, (a: A) => R],
    [k2, f2]: [string, (b: B) => R],
    [k3, f3]: [string, (c: C) => R],
    [k4, f4]: [string, (d: D) => R],
    [k5, f5]: [string, (e: E) => R],
    [k6, f6]: [string, (f: F) => R],
): R => {
    if (v[k1] !== undefined) return f1(v[k1] as A);
    if (v[k2] !== undefined) return f2(v[k2] as B);
    if (v[k3] !== undefined) return f3(v[k3] as C);
    if (v[k4] !== undefined) return f4(v[k4] as D);
    if (v[k5] !== undefined) return f5(v[k5] as E);
    if (v[k6] !== undefined) return f6(v[k6] as F);
    throw new Error('variant must has a key');
};
