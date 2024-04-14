import { Message } from '../types/message';
import { formatDateTime } from '../data/dates';

export const success = <T>(data?: T): Message<T | undefined> => ({
    code: 0,
    message: 'success',
    created: formatDateTime(),
    data,
});

export const failed = (code: number, message: string) => ({ code, message, created: formatDateTime() });

export const FAILED_CODE_SYSTEM_ERROR = 1;

export const FAILED_CODE_WRONG_TOKEN = 40;
export const FAILED_CODE_UNSUPPORTED_IP = 41;

export const FAILED_CODE_BAD_REQUEST = 400;
export const FAILED_CODE_NOT_FOUND = 404;
