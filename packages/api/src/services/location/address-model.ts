import { BaseValueObject } from '../../common/base-models';

export class Address extends BaseValueObject<Address> {
    readonly placeId!: string;
    readonly formattedAddress?: string;
    readonly street?: string;
    readonly city?: string;
    readonly postalCode?: string;
    readonly country?: string;
}
