import { get_management_actor } from '.';
import { string2principal } from '../data/principal';
import { ConnectedIdentity } from '../types';

/// 充值余额
/// ! 任何人都可以调用
/// https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-deposit_cycles
export const deposit_cycles = async ({
    identity,
    canister_id,
    // cycles,
}: {
    identity: ConnectedIdentity;
    canister_id: string;
    // cycles: number;
}): Promise<void> => {
    const { agent } = identity;
    const actor = get_management_actor(agent);
    await actor.deposit_cycles({
        canister_id: string2principal(canister_id),
    });
};
