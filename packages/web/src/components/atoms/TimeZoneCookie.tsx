'use client';

import { useEffect } from 'react';

export function TimeZoneCookie() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {
        if (document) {
            document.cookie = `NEXT_TIMEZONE=${timezone}`;
        }
    }, [timezone]);

    return <></>;
}
