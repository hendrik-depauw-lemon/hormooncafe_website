'use client';

import { useEffect, useState } from 'react';

import { cn } from '../../../shadcn/lib/utils';
import { getAPIVersion, getWebAppVersion } from './actions/get-versions';

interface Props {
    showWebAppVersion?: boolean;
    showApiVersion?: boolean;
    className?: string;
}

function VersionComponent({ showWebAppVersion = true, showApiVersion = true, className }: Props) {
    const [webAppVersion, setWebAppVersion] = useState<string | null>(null);
    const [apiVersion, setApiVersion] = useState<string | null>(null);

    useEffect(() => {
        async function loadVersions() {
            if (showWebAppVersion) {
                const appVersion = getWebAppVersion();
                setWebAppVersion(appVersion);
            }
            if (showApiVersion) {
                const apiVersion = await getAPIVersion();
                setApiVersion(apiVersion);
            }
        }

        loadVersions();
    }, [showWebAppVersion, showApiVersion]);

    if (!showWebAppVersion && !showApiVersion) {
        return null;
    }

    return (
        <div
            className={cn(
                'text-neutral-200 grid grid-cols-2 gap-x-2 py-2 px-4 text-paragraph-md w-fit',
                className,
            )}
        >
            {showWebAppVersion && (
                <>
                    <span>Web App:</span>
                    <span>{webAppVersion ?? 'Loading...'}</span>
                </>
            )}
            {showApiVersion && (
                <>
                    <span>API:</span>
                    <span>{apiVersion ?? 'Loading...'}</span>
                </>
            )}
        </div>
    );
}

export default VersionComponent;
