// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
    env: {
        WEB_APP_VERSION: version,
    },
    images: {
        remotePatterns: [{ hostname: '*' }],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                ],
            },
        ];
    },
});
