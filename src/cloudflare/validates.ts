import { Response } from '@cloudflare/workers-types';
import { hex2array } from '../data/hex';
import { isCanisterIdText, isPrincipalText } from '../ic/principals';
import { failed, FAILED_CODE_BAD_REQUEST } from './common';

export const check_canister_id = (canister_id: string, tips?: string): { err?: Response } => {
    if (isCanisterIdText(canister_id)) return {};
    return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'canister_id'} is invalid.`) };
};

export const check_principal = (principal: string, tips?: string): { err?: Response } => {
    if (isPrincipalText(principal)) return {};
    return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'principal'} is invalid.`) };
};

export const check_integer = (
    id_string: string | undefined,
    tips?: string,
): { id: number; err?: undefined } | { id?: undefined; err: Response } => {
    if (!id_string) {
        return {
            err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'id'} is missing.`),
        };
    }
    try {
        const id = parseInt(id_string);
        if (isNaN(id) || id < 0) {
            return {
                err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'id'} is not a valid number.`),
            };
        }

        return { id };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return {
            err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'id'} is invalid.`),
        };
    }
};

export const check_hash_64 = (hash: string | undefined, tips?: string): { err?: Response } => {
    if (hash && /^[0-9a-fA-F]{64}$/.test(hash)) return {};
    return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'hash'} is invalid.`) };
};

export const check_subaccount = (
    subaccount_hex?: string,
    tips?: string,
): { subaccount?: number[]; err?: undefined } | { subaccount?: undefined; err: Response } => {
    if (subaccount_hex === undefined) return {};
    if (/^[0-9a-fA-F]{64}$/.test(subaccount_hex)) return { subaccount: hex2array(subaccount_hex) };
    return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'subaccount'} is invalid.`) };
};

export const check_account_hex = (to: string, tips?: string): { err?: Response } => {
    if (to && /^[0-9a-fA-F]{64}$/.test(to)) return {};
    return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'account'} is invalid.`) };
};

export const check_bigint = (value: string, tips?: string): { err?: Response } => {
    if (value && /^(0|[1-9]\d*)$/.test(value)) return {};
    return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'number'} is invalid.`) };
};

export const check_hex = (
    hex: string | undefined,
    tips?: string,
): { array?: number[]; err?: undefined } | { array?: undefined; err: Response } => {
    if (hex === undefined) return {};
    try {
        return { array: hex2array(hex) };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return { err: failed(FAILED_CODE_BAD_REQUEST, `${tips ?? 'hex'} is invalid.`) };
    }
};
