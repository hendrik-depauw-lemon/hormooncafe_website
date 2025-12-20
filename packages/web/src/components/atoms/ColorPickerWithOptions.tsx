import { LucideCheck } from 'lucide-react';

import { Button } from '../../shadcn/components/ui/button';
import { cn } from '../../shadcn/lib/utils';
import { ColorSwatch } from './ColorSwatch';

interface ColorPickerWithChoicesProps {
    options?: string[];
    value?: string;
    onChange: (value: string) => void;
}

const defaultOptions = ['#1E40AF', '#047857', '#BE123C', '#7C3AED', '#D97706', '#DB2777'];

export function ColorPickerWithOptions({
    options = defaultOptions,
    value,
    onChange,
}: ColorPickerWithChoicesProps) {
    return (
        <div className="flex gap-2 flex-wrap">
            {options.map((option) => (
                <Button
                    variant="ghost"
                    key={option}
                    onClick={() => onChange(option)}
                    className="h-8 w-8"
                    asChild
                >
                    <div className="relative flex items-center justify-center">
                        <ColorSwatch color={option} size={8} className="absolute" />

                        <LucideCheck
                            className={cn('text-input transition-opacity opacity-0 z-10', {
                                'opacity-100': value === option,
                            })}
                        />
                    </div>
                </Button>
            ))}
        </div>
    );
}
