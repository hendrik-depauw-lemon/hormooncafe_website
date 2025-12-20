import { z } from 'zod';

import { zodStringToBoolean } from '../common/zod-string-to-boolean';

const MOCK_EMAIL = zodStringToBoolean(process.env.MOCK_EMAIL, 'false');

const API_KEY = z
    .string({
        ...(!MOCK_EMAIL && { required_error: 'Missing environment variable "EMAIL_API_KEY"' }),
    })
    .parse(process.env.EMAIL_API_KEY);

type SendMailArgs = {
    to: string;
    replyTo?: string;
    subject: string;
    content: string;
    from: string;
};

export async function sendEmail({ to, replyTo, subject, content, from }: SendMailArgs) {
    if (MOCK_EMAIL) return;

    const url = 'https://api.sendgrid.com/v3/mail/send';
    const body = {
        from: { email: from },
        reply_to: { email: replyTo },
        personalizations: [{ to: [{ email: to }], subject }],
        content: [{ type: 'text/plain', value: content }],
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${await response.text()}`);
    }
}
