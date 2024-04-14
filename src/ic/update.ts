export const catch_signature_failed = async (call: () => Promise<undefined>): Promise<undefined> => {
    try {
        return await call();
    } catch (e) {
        const message = `${e}`;
        console.error('message', message);
        if (message.indexOf('Invalid certificate: Signature verification failed') >= 0) {
            return;
        }
        throw e;
    }
};
