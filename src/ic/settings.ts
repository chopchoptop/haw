import { string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { string2bigint } from '../data';
import { get_management_actor } from '.';

/// 更新罐子设置
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-update_settings
export const update_settings = async ({
    identity,
    canister_id,
    settings,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
    settings: {
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
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.updateSettings({
        canisterId: string2principal(canister_id),
        settings: {
            controllers: settings.controllers,
            freezingThreshold: settings.freezing_threshold ? string2bigint(settings.freezing_threshold) : undefined,
            memoryAllocation: settings.memory_allocation ? string2bigint(settings.memory_allocation) : undefined,
            computeAllocation: settings.compute_allocation ? string2bigint(settings.compute_allocation) : undefined,
            reservedCyclesLimit: settings.reserved_cycles_limit
                ? string2bigint(settings.reserved_cycles_limit)
                : undefined,
            logVisibility:
                settings.log_visibility === 'controllers' ? 0 : settings.log_visibility === 'public' ? 1 : undefined,
            wasmMemoryLimit: settings.wasm_memory_limit ? string2bigint(settings.wasm_memory_limit) : undefined,
            wasmMemoryThreshold: settings.wasm_memory_limit_threshold
                ? string2bigint(settings.wasm_memory_limit_threshold)
                : undefined,
            environmentVariables: settings.environment_variables,
        },
        senderCanisterVersion: undefined,
    });
};
