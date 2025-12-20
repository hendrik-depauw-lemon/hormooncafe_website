'use server';

import z from 'zod';

import getLocale from '../../../../../i18n/getLocale';

const responseSchema = z.object({
    PlaceId: z.string().optional(),
    Title: z.string().optional(),
});

export async function getAddress(placeId: string) {
    const locale = await getLocale();
    const response = await fetch(
        `https://places.geo.eu-west-1.amazonaws.com/v2/place/${placeId}?key=${process.env.PLACES_API_KEY}&Language=${locale}&IntendedUse=SingleUse`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch address: ' + response.statusText);
    }

    const data = await response.json();
    return responseSchema.parse(data);
}
