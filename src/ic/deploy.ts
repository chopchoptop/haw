import { getManagementCanister } from '@dfinity/agent';
import { principal2string, string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { string2bigint, wrapOptionMap } from '../data';
import { install_code } from './code';
import { start_canister } from './life';

/// 部署罐子
export const deploy_canister = async ({
    identity,
    settings,
    wasm_module,
    arg,
}: {
    identity: ConnectedIdentity;
    settings?: {
        controllers?: string[];
        memory_allocation?: string;
        compute_allocation?: string;
        freezing_threshold?: string;
        reserved_cycles_limit?: string;
        log_visibility?: 'controllers' | 'public';
    };
    wasm_module: Uint8Array | number[];
    arg: Uint8Array | number[];
}): Promise<void> => {
    // 1. 创建一个新的罐子
    const { agent } = identity;
    const actor = getManagementCanister({ agent });
    const r = await actor.create_canister({
        settings: wrapOptionMap(settings, (s) => ({
            controllers: wrapOptionMap(s.controllers, (c) => c.map(string2principal)),
            memory_allocation: wrapOptionMap(s.memory_allocation, string2bigint),
            compute_allocation: wrapOptionMap(s.compute_allocation, string2bigint),
            freezing_threshold: wrapOptionMap(s.freezing_threshold, string2bigint),
            reserved_cycles_limit: wrapOptionMap(s.reserved_cycles_limit, string2bigint),
            log_visibility: wrapOptionMap(s.freezing_threshold, (s) => {
                switch (s) {
                    case 'controllers':
                        return { controllers: null };
                    case 'public':
                        return { public: null };
                    default:
                        throw new Error('invalid log_visibility');
                }
            }),
        })),
        sender_canister_version: [],
    });
    const canister_id = principal2string(r.canister_id);

    // 2. 安装代码
    await install_code({ identity, canister_id, wasm_module, arg });

    // 3. 启动罐子
    await start_canister({ identity, canister_id });
};
