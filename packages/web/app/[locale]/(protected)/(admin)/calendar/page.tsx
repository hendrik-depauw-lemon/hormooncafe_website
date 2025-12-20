import { NextPage } from 'next';

import { NativeControlledEventCalendar } from '../../../../../src/components/organism/native-event-calendar/NativeControlledEventCalendar';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const Page: NextPage = async () => {
    return <NativeControlledEventCalendar />;
};

export default Page;
