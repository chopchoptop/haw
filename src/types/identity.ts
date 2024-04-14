import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

export type ActorCreator = <T>(
    idlFactory: IDL.InterfaceFactory, // candid接口
    canister_id: string, // 目标罐子
) => Promise<ActorSubclass<T>>;

export type ConnectedIdentity = {
    principal: string;
    account: string;
    agent: HttpAgent;
    creator: ActorCreator; // 登录的凭证
};
