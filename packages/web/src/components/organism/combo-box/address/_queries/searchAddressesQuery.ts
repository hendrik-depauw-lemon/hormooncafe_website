'use server';

import z from 'zod';

import getLocale from '../../../../../i18n/getLocale';

const responseSchema = z.object({
    ResultItems: z.array(
        z.object({
            PlaceId: z.string().optional(),
            Title: z.string().optional(),
        }),
    ),
});

export async function searchAddresses(query: string) {
    const locale = await getLocale();
    const response = await fetch(
        `https://places.geo.eu-west-1.amazonaws.com/v2/autocomplete?key=${process.env.PLACES_API_KEY}`,
        {
            method: 'POST',
            body: JSON.stringify({
                Language: locale,
                QueryText: query,
                IntendedUse: 'SingleUse',
                Filter: { IncludeCountries: ['BEL', 'LUX'] },
            }),
        },
    );

    if (!response.ok) {
        throw new Error('Failed to fetch address: ' + response.statusText);
    }

    const data = await response.json();
    return responseSchema.parse(data);
}
