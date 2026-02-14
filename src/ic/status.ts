import { principal2string, string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { array2hex, bigint2string, unwrapOptionMap, unwrapVariantKey } from '../data';
import { get_management_actor } from '.';
import { canister_status_result } from '@icp-sdk/canisters/declarations/ic-management/ic-management';

/// 查询罐子状态
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-canister_status
export const canister_status = async ({
    identity,
    canister_id,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
}): Promise<{
    memory_metrics: {
        wasm_binary_size: string;
        wasm_chunk_store_size: string;
        canister_history_size: string;
        stable_memory_size: string;
        snapshots_size: string;
        wasm_memory_size: string;
        global_memory_size: string;
        custom_sections_size: string;
    };
    status: 'running' | 'stopping' | 'stopped';
    memory_size: string;
    ready_for_migration: boolean;
    version: string;
    cycles: string;
    settings: {
        freezing_threshold: string;
        wasm_memory_threshold: string;
        environment_variables: { value: string; name: string }[];
        controllers: string[];
        reserved_cycles_limit: string;
        log_visibility: 'controllers' | 'public' | { allowed_viewers: string[] };
        wasm_memory_limit: string;
        memory_allocation: string;
        compute_allocation: string;
    };
    query_stats: {
        response_payload_bytes_total: string;
        num_instructions_total: string;
        num_calls_total: string;
        request_payload_bytes_total: string;
    };
    idle_cycles_burned_per_day: string;
    module_hash?: string;
    reserved_cycles: string;
}> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    const r = (await actor.canisterStatus({
        canisterId: string2principal(canister_id),
    })) as canister_status_result;
    return {
        memory_metrics: {
            wasm_binary_size: bigint2string(r.memory_metrics.wasm_binary_size),
            wasm_chunk_store_size: bigint2string(r.memory_metrics.wasm_chunk_store_size),
            canister_history_size: bigint2string(r.memory_metrics.canister_history_size),
            stable_memory_size: bigint2string(r.memory_metrics.stable_memory_size),
            snapshots_size: bigint2string(r.memory_metrics.snapshots_size),
            wasm_memory_size: bigint2string(r.memory_metrics.wasm_memory_size),
            global_memory_size: bigint2string(r.memory_metrics.global_memory_size),
            custom_sections_size: bigint2string(r.memory_metrics.custom_sections_size),
        },
        status: unwrapVariantKey(r.status),
        memory_size: bigint2string(r.memory_size),
        ready_for_migration: r.ready_for_migration,
        version: bigint2string(r.version),
        cycles: bigint2string(r.cycles),
        settings: {
            freezing_threshold: bigint2string(r.settings.freezing_threshold),
            wasm_memory_threshold: bigint2string(r.settings.wasm_memory_threshold),
            environment_variables: r.settings.environment_variables,
            controllers: r.settings.controllers.map(principal2string),
            reserved_cycles_limit: bigint2string(r.settings.reserved_cycles_limit),
            log_visibility:
                'controllers' in r.settings.log_visibility
                    ? 'controllers'
                    : 'public' in r.settings.log_visibility
                      ? 'public'
                      : { allowed_viewers: r.settings.log_visibility.allowed_viewers.map(principal2string) },
            wasm_memory_limit: bigint2string(r.settings.wasm_memory_limit),
            memory_allocation: bigint2string(r.settings.memory_allocation),
            compute_allocation: bigint2string(r.settings.compute_allocation),
        },
        query_stats: {
            response_payload_bytes_total: bigint2string(r.query_stats.response_payload_bytes_total),
            num_instructions_total: bigint2string(r.query_stats.num_instructions_total),
            num_calls_total: bigint2string(r.query_stats.num_calls_total),
            request_payload_bytes_total: bigint2string(r.query_stats.request_payload_bytes_total),
        },
        idle_cycles_burned_per_day: bigint2string(r.memory_size),
        module_hash: unwrapOptionMap(r.module_hash, array2hex),
        reserved_cycles: bigint2string(r.memory_size),
    };
};

// /// 查询罐子信息
// /// ! 罐子可以调用，用户身份不可以调用
// /// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-canister-info
// export const canister_info = async ({
//     identity,
//     canister_id,
//     num_requested_changes,
// }: {
//     identity: ConnectedIdentity;
//     canister_id: string;
//     num_requested_changes?: string;
// }): Promise<{
//     controllers: string[];
//     module_hash?: string;
//     total_num_changes: string;
//     recent_changes: {
//         timestamp_nanos: string;
//         canister_version: string;
//         origin:
//             | { from_user: string; from_canister?: undefined }
//             | { from_user?: undefined; from_canister: { canister_id: string; canister_version?: string } };
//         details:
//             | {
//                   creation: { controllers: string[] };
//                   controllers_change?: undefined;
//                   code_deployment?: undefined;
//                   code_uninstall?: undefined;
//               }
//             | {
//                   creation?: undefined;
//                   controllers_change: { controllers: string[] };
//                   code_deployment?: undefined;
//                   code_uninstall?: undefined;
//               }
//             | {
//                   creation?: undefined;
//                   controllers_change?: undefined;
//                   code_deployment: { mode: 'install' | 'upgrade' | 'reinstall'; module_hash: string };
//                   code_uninstall?: undefined;
//               }
//             | {
//                   creation?: undefined;
//                   controllers_change?: undefined;
//                   code_deployment?: undefined;
//                   code_uninstall: object;
//               };
//     }[];
// }> => {
//     const { agent } = identity;
//     const actor = get_management_actor(agent);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const r: any = await actor.canisterInfo({
//         canister_id: string2principal(canister_id),
//         num_requested_changes: wrapOptionMap(num_requested_changes, string2bigint),
//     });
//     return {
//         controllers: r.controllers.map(principal2string),
//         module_hash: unwrapOptionMap(r.module_hash, array2hex),
//         total_num_changes: bigint2string(r.total_num_changes),
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         recent_changes: r.recent_changes.map((r: any) => ({
//             timestamp_nanos: bigint2string(r.timestamp_nanos),
//             canister_version: bigint2string(r.canister_version),
//             origin: (() => {
//                 const origin = r.origin as
//                     | {
//                           from_user: {
//                               user_id: Principal;
//                           };
//                           from_canister?: undefined;
//                       }
//                     | {
//                           from_user?: undefined;
//                           from_canister: {
//                               canister_version: [] | [bigint];
//                               canister_id: Principal;
//                           };
//                       };
//                 return origin.from_user
//                     ? { from_user: principal2string(origin.from_user.user_id) }
//                     : {
//                           from_canister: {
//                               canister_id: principal2string(origin.from_canister.canister_id),
//                               canister_version: unwrapOptionMap(origin.from_canister.canister_version, bigint2string),
//                           },
//                       };
//             })(),
//             details: (() => {
//                 const details = r.details as
//                     | {
//                           creation: {
//                               controllers: Array<Principal>;
//                           };
//                           controllers_change?: undefined;
//                           code_deployment?: undefined;
//                           code_uninstall?: undefined;
//                       }
//                     | {
//                           creation?: undefined;
//                           controllers_change: {
//                               controllers: Array<Principal>;
//                           };
//                           code_deployment?: undefined;
//                           code_uninstall?: undefined;
//                       }
//                     | {
//                           creation?: undefined;
//                           controllers_change?: undefined;
//                           code_deployment: {
//                               mode:
//                                   | {
//                                         reinstall: null;
//                                     }
//                                   | {
//                                         upgrade: null;
//                                     }
//                                   | {
//                                         install: null;
//                                     };
//                               module_hash: Uint8Array | number[];
//                           };
//                           code_uninstall?: undefined;
//                       }
//                     | {
//                           creation?: undefined;
//                           controllers_change?: undefined;
//                           code_deployment?: undefined;
//                           code_uninstall: null;
//                       };
//                 return details.creation
//                     ? {
//                           creation: { controllers: details.creation.controllers.map(principal2string) },
//                       }
//                     : details.controllers_change
//                       ? {
//                             controllers_change: {
//                                 controllers: details.controllers_change.controllers.map(principal2string),
//                             },
//                         }
//                       : details.code_deployment
//                         ? {
//                               code_deployment: {
//                                   mode: unwrapVariantKey(details.code_deployment.mode),
//                                   module_hash: array2hex(details.code_deployment.module_hash),
//                               },
//                           }
//                         : {
//                               code_uninstall: {},
//                           };
//             })(),
//         })),
//     };
// };
