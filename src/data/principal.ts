import { Principal } from '@dfinity/principal';

// Principal -> string
export const principal2string = (p: Principal): string => p.toText();

// string -> Principal // ! 注意会抛出异常
export const string2principal = (p: string): Principal => Principal.fromText(p);
