import { Actor, Agent, MANAGEMENT_CANISTER_ID } from '@dfinity/agent';
import { idlFactory as managementIdl } from '@dfinity/ic-management/dist/candid/ic-management.idl';

export * from './collection/ext';

export * from './account';
export * from './anonymous';
export * from './code';
export * from './common';
export * from './cycles';
export * from './deploy';
export * from './identity';
export * from './life';
export * from './principals';
export * from './settings';
export * from './status';
export * from './update';

export const get_management_actor = (agent: Agent) =>
    Actor.createActor(managementIdl, { agent, canisterId: MANAGEMENT_CANISTER_ID });
