import { GeoPlacesClient, GetPlaceCommand } from '@aws-sdk/client-geo-places';

import { Address } from './address-model';

export class LocationService {
    private static client = new GeoPlacesClient({});

    static async getAddress(placeId?: string): Promise<Address | undefined> {
        if (!placeId) return undefined;

        const result = await this.client.send(
            new GetPlaceCommand({
                Key: process.env.PLACES_API_KEY,
                PlaceId: placeId,
                Language: 'nl',
                IntendedUse: 'Storage',
            }),
        );

        return new Address({
            placeId,
            formattedAddress: result.Title,
            street: result.Address?.Street,
            city: result.Address?.Locality,
            postalCode: result.Address?.PostalCode,
            country: result.Address?.Country?.Name,
        });
    }
}
