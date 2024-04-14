import { getManagementCanister } from '@dfinity/agent';
import { principal2string, string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { string2bigint, wrapOptionMap } from '../data';

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
        memory_allocation?: string;
        compute_allocation?: string;
        freezing_threshold?: string;
        reserved_cycles_limit?: string;
        log_visibility?: 'controllers' | 'public';
    };
}): Promise<string> => {
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
    const actor = getManagementCanister({ agent });
    await actor.start_canister({
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
    const actor = getManagementCanister({ agent });
    await actor.stop_canister({
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
    const actor = getManagementCanister({ agent });
    await actor.delete_canister({
        canister_id: string2principal(canister_id),
    });
};
