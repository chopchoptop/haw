import { principal2string } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { string2bigint } from '../data';
import { install_code } from './code';
import { start_canister } from './life';
import { get_management_actor } from '.';

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
        freezing_threshold?: string;
        memory_allocation?: string;
        compute_allocation?: string;
        reserved_cycles_limit?: string;
        log_visibility?: 'controllers' | 'public';
        wasm_memory_limit?: string;
        wasm_memory_limit_threshold?: string;
        environment_variables?: { value: string; name: string }[];
    };
    wasm_module: Uint8Array | number[];
    arg: Uint8Array | number[];
}): Promise<void> => {
    // 1. 创建一个新的罐子
    const { agent } = identity;
    const actor = get_management_actor(agent);
    const _canister_id = await actor.createCanister({
        settings: settings
            ? {
                  controllers: settings.controllers,
                  freezingThreshold: settings.freezing_threshold
                      ? string2bigint(settings.freezing_threshold)
                      : undefined,
                  memoryAllocation: settings.memory_allocation ? string2bigint(settings.memory_allocation) : undefined,
                  computeAllocation: settings.compute_allocation
                      ? string2bigint(settings.compute_allocation)
                      : undefined,
                  reservedCyclesLimit: settings.reserved_cycles_limit
                      ? string2bigint(settings.reserved_cycles_limit)
                      : undefined,
                  logVisibility:
                      settings.log_visibility === 'controllers'
                          ? 0
                          : settings.log_visibility === 'public'
                            ? 1
                            : undefined,
                  wasmMemoryLimit: settings.wasm_memory_limit ? string2bigint(settings.wasm_memory_limit) : undefined,
                  wasmMemoryThreshold: settings.wasm_memory_limit_threshold
                      ? string2bigint(settings.wasm_memory_limit_threshold)
                      : undefined,
                  environmentVariables: settings.environment_variables,
              }
            : undefined,
        senderCanisterVersion: undefined,
    });
    const canister_id = principal2string(_canister_id);

    // 2. 安装代码
    await install_code({ identity, canister_id, wasm_module, arg });

    // 3. 启动罐子
    await start_canister({ identity, canister_id });
};
