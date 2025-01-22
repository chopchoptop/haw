import { Response } from '@cloudflare/workers-types';
import { success as _success, failed as _failed } from '../common/message';
export {
    FAILED_CODE_SYSTEM_ERROR,
    FAILED_CODE_WRONG_TOKEN,
    FAILED_CODE_UNSUPPORTED_IP,
    FAILED_CODE_BAD_REQUEST,
    FAILED_CODE_NOT_FOUND,
} from '../common/message';

export const success = <T>(data?: T) => Response.json(_success(data));
export const failed = (code: number, message: string) => Response.json(_failed(code, message));
