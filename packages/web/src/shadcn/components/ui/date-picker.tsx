'use client';

import { format, formatInTimeZone } from 'date-fns-tz';
import { CalendarDays, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/src/shadcn/components/ui/button';
import { Calendar } from '@/src/shadcn/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shadcn/components/ui/popover';
import { cn } from '@/src/shadcn/lib/utils';

export interface DatePickerProps {
    date?: Date;
    onDateChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    showAsDropdown?: boolean;
    dateFormat?: string;
    timezone?: string;
}

export function DatePicker({
    date,
    onDateChange,
    placeholder = 'Pick a date',
    disabled = false,
    className,
    showAsDropdown = true,
    dateFormat,
    timezone,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        onDateChange?.(selectedDate);
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className,
                    )}
                    disabled={disabled}
                >
                    {!showAsDropdown && <CalendarDays className="mr-2 h-4 w-4" />}
                    <span>
                        {date
                            ? timezone
                                ? formatInTimeZone(date, timezone, dateFormat || 'dd/MM/yyyy')
                                : format(date, dateFormat || 'dd/MM/yyyy')
                            : placeholder}
                    </span>
                    {showAsDropdown && <ChevronDown />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    timeZone={timezone}
                />
            </PopoverContent>
        </Popover>
    );
}
