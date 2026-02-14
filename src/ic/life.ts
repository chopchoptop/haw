import { principal2string, string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { string2bigint } from '../data';
import { get_management_actor } from '.';

/// 创建罐子
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-create_canister
export const create_canister = async ({
    identity,
    settings,
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
}): Promise<string> => {
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

    return canister_id;
};

/// 启动罐子
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-start_canister
export const start_canister = async ({
    identity,
    canister_id,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.startCanister({
        canister_id: string2principal(canister_id),
    });
};

/// 停止罐子
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-stop_canister
export const stop_canister = async ({
    identity,
    canister_id,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.stopCanister({
        canister_id: string2principal(canister_id),
    });
};

/// 删除罐子
/// ! Only the controllers of the canister
/// ! already be stopped
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-delete_canister
export const delete_canister = async ({
    identity,
    canister_id,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.deleteCanister({
        canister_id: string2principal(canister_id),
    });
};
