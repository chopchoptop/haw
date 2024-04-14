import { Principal } from '@dfinity/principal';
import { principal2string, string2principal } from '../../data/principal';

// ext 标准计算 id 需要的常量
const TDS = [10, 116, 105, 100]; //b"\x0Atid"

// 计算 token_identifier
export const parse_token_identifier = (collection: string, token_index: number): string => {
    const buffer: number[] = [
        ...TDS,
        ...string2principal(collection).toUint8Array(),
        (token_index >> 24) & 0xff,
        (token_index >> 16) & 0xff,
        (token_index >> 8) & 0xff,
        token_index & 0xff,
    ];

    return principal2string(Principal.fromUint8Array(new Uint8Array(buffer)));
};
