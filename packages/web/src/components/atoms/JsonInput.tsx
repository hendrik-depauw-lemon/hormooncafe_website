import { Wand } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Button } from '../../shadcn/components/ui/button';
import { Textarea } from '../../shadcn/components/ui/textarea';

type JsonInputProps = {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
};

export function JsonInput({ value, onChange, disabled }: JsonInputProps) {
    const t = useTranslations('common.json-input');

    const onFormat = useCallback(() => {
        try {
            const formattedJson = JSON.stringify(JSON.parse(value ?? ''), null, 2);
            onChange?.(formattedJson);
        } catch {
            toast(t('error-message'));
        }
    }, [value, onChange, t]);

    return (
        <div className="relative">
            <Textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            ></Textarea>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1"
                onClick={onFormat}
            >
                <Wand />
            </Button>
        </div>
    );
}
