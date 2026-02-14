import { CanisterStatus, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { string2principal } from '../data/principal';

export type CanisterInfo = {
    time: Date;
    controllers: Principal[];
    subnet: null | CanisterStatus.SubnetStatus;
    module_hash: string; // hex
    candid: null | string; // motoko 代码的罐子会有 candid, Rust 代码的没有
};

// 匿名查询 Canister 状态
export const canister_status_info = (
    canister_id: string,
    host: string = 'https://icp-api.io/',
): Promise<CanisterInfo> => {
    return new Promise<CanisterInfo>((resolve, reject) => {
        CanisterStatus.request({
            canisterId: string2principal(canister_id),
            agent: HttpAgent.createSync({
                host, // 默认调用线上的接口
            }),
            paths: ['time', 'controllers', 'subnet', 'module_hash', 'candid'],
        })
            .then((r) => {
                console.error('CanisterStatus', r);
                resolve({
                    time: r.get('time') as Date,
                    subnet: r.get('subnet') as CanisterStatus.SubnetStatus,
                    candid: r.get('candid') as string,
                    module_hash: r.get('module_hash') as string,
                    controllers: r.get('controllers') as Principal[],
                });
            })
            .catch((e) => {
                console.error('CanisterStatus error', e);
                reject(e);
            });
    });
};

export const canister_module_hash_and_time = (
    canister_id: string,
    host: string = 'https://icp-api.io/',
): Promise<{
    time: Date;
    module_hash: string;
}> => {
    return new Promise<{
        time: Date;
        module_hash: string;
    }>((resolve, reject) => {
        CanisterStatus.request({
            canisterId: string2principal(canister_id),
            agent: HttpAgent.createSync({
                host, // 默认调用线上的接口
            }),
            paths: ['time', 'module_hash'],
        })
            .then((r) => {
                // console.error("CanisterStatus", r);
                resolve({
                    time: r.get('time') as Date,
                    module_hash: r.get('module_hash') as string,
                });
            })
            .catch((e) => {
                // console.error("CanisterStatus error", e);
                reject(e);
            });
    });
};

export const canister_candid = (canister_id: string, host: string = 'https://icp-api.io/'): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        CanisterStatus.request({
            canisterId: string2principal(canister_id),
            agent: HttpAgent.createSync({
                host, // 默认调用线上的接口
            }),
            paths: [
                {
                    kind: 'metadata',
                    key: 'candid:service',
                    path: 'candid:service',
                    decodeStrategy: 'utf-8',
                },
            ],
        })
            .then((r) => {
                const result = r.get('candid:service');
                if (result && typeof result === 'string') {
                    resolve(result);
                } else {
                    console.error(`r: ${JSON.stringify(r)}`);
                    console.error(`r: ${result}`);
                    console.error(`r: ${JSON.stringify(r.get('candid:service'))}`);
                    reject(r);
                }
            })
            .catch((e) => {
                console.error('CanisterStatus error', e);
                reject(e);
            });
    });
};
