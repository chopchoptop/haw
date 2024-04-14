import { getManagementCanister } from '@dfinity/agent';
import { principal2string, string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';
import { array2hex, bigint2string, string2bigint, unwrapOptionMap, unwrapVariantKey, wrapOptionMap } from '../data';
import { Principal } from '@dfinity/principal';

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
    cycles: string;
    settings: {
        controllers: string[];
        memory_allocation: string;
        compute_allocation: string;
        freezing_threshold: string;
        reserved_cycles_limit: string;
        log_visibility: 'controllers' | 'public';
    };
    status: 'running' | 'stopping' | 'stopped';
    memory_size: string;
    idle_cycles_burned_per_day: string;
    reserved_cycles: string;
    module_hash?: string;
}> => {
    const { agent } = identity;
    const actor = getManagementCanister({ agent });
    const r = await actor.canister_status({
        canister_id: string2principal(canister_id),
    });
    return {
        cycles: bigint2string(r.cycles),
        settings: {
            controllers: r.settings.controllers.map(principal2string),
            memory_allocation: bigint2string(r.settings.memory_allocation),
            compute_allocation: bigint2string(r.settings.compute_allocation),
            freezing_threshold: bigint2string(r.settings.freezing_threshold),
            reserved_cycles_limit: bigint2string(r.settings.reserved_cycles_limit),
            log_visibility: unwrapVariantKey(r.settings.log_visibility),
        },
        status: unwrapVariantKey(r.status),
        memory_size: bigint2string(r.memory_size),
        idle_cycles_burned_per_day: bigint2string(r.memory_size),
        reserved_cycles: bigint2string(r.memory_size),
        module_hash: unwrapOptionMap(r.module_hash, array2hex),
    };
};

/// 查询罐子信息
/// ! 罐子可以调用，用户身份不可以调用
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-canister-info
export const canister_info = async ({
    identity,
    canister_id,
    num_requested_changes,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
    num_requested_changes?: string;
}): Promise<{
    controllers: string[];
    module_hash?: string;
    total_num_changes: string;
    recent_changes: {
        timestamp_nanos: string;
        canister_version: string;
        origin:
            | { from_user: string; from_canister?: undefined }
            | { from_user?: undefined; from_canister: { canister_id: string; canister_version?: string } };
        details:
            | {
                  creation: { controllers: string[] };
                  controllers_change?: undefined;
                  code_deployment?: undefined;
                  code_uninstall?: undefined;
              }
            | {
                  creation?: undefined;
                  controllers_change: { controllers: string[] };
                  code_deployment?: undefined;
                  code_uninstall?: undefined;
              }
            | {
                  creation?: undefined;
                  controllers_change?: undefined;
                  code_deployment: { mode: 'install' | 'upgrade' | 'reinstall'; module_hash: string };
                  code_uninstall?: undefined;
              }
            | {
                  creation?: undefined;
                  controllers_change?: undefined;
                  code_deployment?: undefined;
                  code_uninstall: object;
              };
    }[];
}> => {
    const { agent } = identity;
    const actor = getManagementCanister({ agent });
    const r = await actor.canister_info({
        canister_id: string2principal(canister_id),
        num_requested_changes: wrapOptionMap(num_requested_changes, string2bigint),
    });
    return {
        controllers: r.controllers.map(principal2string),
        module_hash: unwrapOptionMap(r.module_hash, array2hex),
        total_num_changes: bigint2string(r.total_num_changes),
        recent_changes: r.recent_changes.map((r) => ({
            timestamp_nanos: bigint2string(r.timestamp_nanos),
            canister_version: bigint2string(r.canister_version),
            origin: (() => {
                const origin = r.origin as
                    | {
                          from_user: {
                              user_id: Principal;
                          };
                          from_canister?: undefined;
                      }
                    | {
                          from_user?: undefined;
                          from_canister: {
                              canister_version: [] | [bigint];
                              canister_id: Principal;
                          };
                      };
                return origin.from_user
                    ? { from_user: principal2string(origin.from_user.user_id) }
                    : {
                          from_canister: {
                              canister_id: principal2string(origin.from_canister.canister_id),
                              canister_version: unwrapOptionMap(origin.from_canister.canister_version, bigint2string),
                          },
                      };
            })(),
            details: (() => {
                const details = r.details as
                    | {
                          creation: {
                              controllers: Array<Principal>;
                          };
                          controllers_change?: undefined;
                          code_deployment?: undefined;
                          code_uninstall?: undefined;
                      }
                    | {
                          creation?: undefined;
                          controllers_change: {
                              controllers: Array<Principal>;
                          };
                          code_deployment?: undefined;
                          code_uninstall?: undefined;
                      }
                    | {
                          creation?: undefined;
                          controllers_change?: undefined;
                          code_deployment: {
                              mode:
                                  | {
                                        reinstall: null;
                                    }
                                  | {
                                        upgrade: null;
                                    }
                                  | {
                                        install: null;
                                    };
                              module_hash: Uint8Array | number[];
                          };
                          code_uninstall?: undefined;
                      }
                    | {
                          creation?: undefined;
                          controllers_change?: undefined;
                          code_deployment?: undefined;
                          code_uninstall: null;
                      };
                return details.creation
                    ? {
                          creation: { controllers: details.creation.controllers.map(principal2string) },
                      }
                    : details.controllers_change
                      ? {
                            controllers_change: {
                                controllers: details.controllers_change.controllers.map(principal2string),
                            },
                        }
                      : details.code_deployment
                        ? {
                              code_deployment: {
                                  mode: unwrapVariantKey(details.code_deployment.mode),
                                  module_hash: array2hex(details.code_deployment.module_hash),
                              },
                          }
                        : {
                              code_uninstall: {},
                          };
            })(),
        })),
    };
};
