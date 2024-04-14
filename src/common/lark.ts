import { formatDateTime8 } from '../data/dates';

export const send_lark_notice = async (url: string, content: string) => {
    await fetch(url, {
        method: 'POST',
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify({
            msg_type: 'text',
            content: { text: `${content}\n${formatDateTime8()}` },
        }),
    });
};
