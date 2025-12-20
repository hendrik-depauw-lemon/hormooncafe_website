'use client';

import { useState } from 'react';
import { useMutation } from 'urql';

import { useRouter } from '@/src/i18n/navigation';
import { Switch } from '@/src/shadcn/components/ui/switch';

import { activateScheduledJobMutation } from '../_actions/activateScheduledJob';
import { deactivateScheduledJobMutation } from '../_actions/deactivateScheduledJob';

type ScheduledJobActiveSwitchProps = {
    initialValues: {
        id: string;
        active: boolean;
    };
};

export function ScheduledJobActiveSwitch({ initialValues }: ScheduledJobActiveSwitchProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [_, activate] = useMutation(activateScheduledJobMutation);
    const [__, deactivate] = useMutation(deactivateScheduledJobMutation);

    const onCheckedChange = async (checked: boolean) => {
        setLoading(true);
        try {
            if (checked) {
                await activate({ input: { id: initialValues.id } });
            } else {
                await deactivate({ input: { id: initialValues.id } });
            }
        } catch (error) {
            console.error('Error toggling activation:', error);
        } finally {
            setLoading(false);
            router.refresh();
        }
    };

    return (
        <Switch
            disabled={loading}
            checked={initialValues.active}
            onCheckedChange={onCheckedChange}
        />
    );
}
