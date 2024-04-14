import { getManagementCanister } from '@dfinity/agent';
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
    const actor = getManagementCanister({ agent });
    await actor.install_code({
        canister_id: string2principal(canister_id),
        arg,
        wasm_module,
        mode: { install: null },
        sender_canister_version: [],
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
    const actor = getManagementCanister({ agent });
    await actor.install_code({
        canister_id: string2principal(canister_id),
        arg,
        wasm_module,
        mode: { upgrade: [] },
        sender_canister_version: [],
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
    const actor = getManagementCanister({ agent });
    await actor.install_code({
        canister_id: string2principal(canister_id),
        arg,
        wasm_module,
        mode: { reinstall: null },
        sender_canister_version: [],
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
    const actor = getManagementCanister({ agent });
    await actor.uninstall_code({
        canister_id: string2principal(canister_id),
        sender_canister_version: [],
    });
};
