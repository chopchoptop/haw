import { ConnectedIdentity } from '../types/identity';
import { getAnonymousActorCreator, getAnonymousAgent } from './identity';

// 全局共享的匿名身份
export const anonymous: ConnectedIdentity = (() => {
    return {
        principal: '2vxsx-fae', // 匿名身份
        account: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79', // 匿名身份
        agent: getAnonymousAgent(),
        creator: getAnonymousActorCreator(),
    };
})();
