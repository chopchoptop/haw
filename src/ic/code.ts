import { get_management_actor } from '.';
import { string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';

/// 安装罐子代码
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-install_code
export const install_code = async ({
    identity,
    canister_id,
    wasm_module,
    arg,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
    wasm_module: Uint8Array | number[];
    arg: Uint8Array | number[];
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.installCode({
        mode: { install: null },
        canisterId: string2principal(canister_id),
        wasmModule: new Uint8Array(wasm_module),
        arg: new Uint8Array(arg),
        senderCanisterVersion: undefined,
    });
};

/// 升级代码
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-install_code
export const upgrade_code = async ({
    identity,
    canister_id,
    wasm_module,
    arg,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
    wasm_module: Uint8Array | number[];
    arg: Uint8Array | number[];
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.installCode({
        mode: { upgrade: [] },
        canisterId: string2principal(canister_id),
        wasmModule: new Uint8Array(wasm_module),
        arg: new Uint8Array(arg),
        senderCanisterVersion: undefined,
    });
};

/// 重新安装代码
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-install_code
export const reinstall_code = async ({
    identity,
    canister_id,
    wasm_module,
    arg,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
    wasm_module: Uint8Array | number[];
    arg: Uint8Array | number[];
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.installCode({
        mode: { reinstall: null },
        canisterId: string2principal(canister_id),
        wasmModule: new Uint8Array(wasm_module),
        arg: new Uint8Array(arg),
        senderCanisterVersion: undefined,
    });
};

/// 卸载罐子代码
/// ! Only the controllers of the canister
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-uninstall_code
export const uninstall_code = async ({
    identity,
    canister_id,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.uninstallCode({
        canisterId: string2principal(canister_id),
        senderCanisterVersion: undefined,
    });
};
