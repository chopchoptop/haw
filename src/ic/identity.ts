import { Identity, HttpAgent, Actor } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { ActorCreator, ConnectedIdentity } from '../types/identity';
import { hex2array } from '../data/hex';
import { principal2account } from './account';

const IC_HTTP_HOST = 'https://icp-api.io/';

export const getAnonymousAgent = (): HttpAgent => {
    return HttpAgent.createSync({ host: IC_HTTP_HOST });
};
export const getAnonymousActorCreator = (): ActorCreator => {
    return async <T>(idlFactory: IDL.InterfaceFactory, canisterId: string) => {
        const agent = getAnonymousAgent();
        return Actor.createActor<T>(idlFactory, { agent, canisterId });
    };
};

export const getIdentityFromSecretKey = async (secret_key: string): Promise<Identity> => {
    const seed = hex2array(secret_key);
    const identity = Ed25519KeyIdentity.fromSecretKey(new Uint8Array(seed));
    return identity;
};

export const getActorCreatorByAgent = (agent: HttpAgent): ActorCreator => {
    return async <T>(idlFactory: IDL.InterfaceFactory, canisterId: string) => {
        return Actor.createActor<T>(idlFactory, { agent, canisterId });
    };
};

export const getIdentityBySecretKey = async (secret_key: string): Promise<ConnectedIdentity> => {
    const identity = await getIdentityFromSecretKey(secret_key);
    const principal = identity.getPrincipal().toText();
    const account = principal2account(principal);
    const agent = HttpAgent.createSync({
        host: IC_HTTP_HOST,
        identity: identity,
    });
    return {
        principal,
        account,
        agent,
        creator: getActorCreatorByAgent(agent),
    };
};
