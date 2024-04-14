import { Request, Response, ExecutionContext } from '@cloudflare/workers-types';
import { failed, FAILED_CODE_SYSTEM_ERROR } from './common';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const handle_error = (call: (req: Request, env: any, ctx: ExecutionContext) => Promise<Response>) => {
    return async (req: Request, env: any, ctx: ExecutionContext) => {
        try {
            return await call(req, env, ctx);
        } catch (e: any) {
            console.error(`handle error`, e);
            return failed(FAILED_CODE_SYSTEM_ERROR, `System error: ${e.message}`);
        }
    };
};
