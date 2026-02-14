import { Agent } from '@dfinity/agent';
import { IcManagementCanister } from '@icp-sdk/canisters/ic-management';

export * from './collection/ext';

export * from './account';
export * from './anonymous';
export * from './code';
export * from './common';
// export * from './cycles';
export * from './deploy';
export * from './identity';
export * from './life';
export * from './principals';
export * from './settings';
export * from './status';
export * from './update';

export const get_management_actor = (agent: Agent) => IcManagementCanister.create({ agent });
