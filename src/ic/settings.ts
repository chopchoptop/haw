import { getManagementCanister } from '@dfinity/agent';
import { string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { string2bigint, wrapOptionMap } from '../data';

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
        memory_allocation?: string;
        compute_allocation?: string;
        freezing_threshold?: string;
        reserved_cycles_limit?: string;
        log_visibility?: 'controllers' | 'public';
    };
}): Promise<void> => {
    const { agent } = identity;
    const actor = getManagementCanister({ agent });
    const s = settings;
    await actor.update_settings({
        canister_id: string2principal(canister_id),
        settings: {
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
        },
        sender_canister_version: [],
    });
};
