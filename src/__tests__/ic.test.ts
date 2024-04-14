import { formatDateTime } from '../data/dates';
import { array2hex } from '../data/hex';
import { canister_status, canister_candid } from '../ic/status';
import { Ed25519KeyIdentity } from '@dfinity/identity';

test('random identity', () => {
    // const identity = Ed25519KeyIdentity.generate();
    // const key_pair = identity.getKeyPair();
    // const secret = new Uint8Array(key_pair.secretKey);
    // const principal = identity.getPrincipal().toText();
    // const secret_hex = array2hex(secret);
    // console.debug('random identity', secret_hex, '->', principal);
});

test('status', async () => {
    // const status = await canister_status('ryjl3-tyaaa-aaaaa-aaaba-cai');
    // const status = await canister_status('2222s-4iaaa-aaaaf-ax2uq-cai');
    // const status = await canister_status('jwcfb-hyaaa-aaaaj-aac4q-cai');
    // console.debug('status', status);
});
