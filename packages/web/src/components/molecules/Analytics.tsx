import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { headers } from 'next/headers';

export default async function Analytics() {
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANAYTICS_ID;
    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
    const nonce = (await headers()).get('x-nonce') ?? undefined;

    return (
        <>
            {!!gaId && <GoogleAnalytics gaId={gaId} nonce={nonce} />}
            {!!gtmId && <GoogleTagManager gtmId={gtmId} nonce={nonce} />}
        </>
    );
}
