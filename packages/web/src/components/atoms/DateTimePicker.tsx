'use client';

import { format, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { LucideClock } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { DatePicker } from '@/src/shadcn/components/ui/date-picker';
import { Input } from '@/src/shadcn/components/ui/input';
import { cn } from '@/src/shadcn/lib/utils';

export interface DateTimePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    timezone?: string;
}

export function DateTimePicker({
    value,
    onChange,
    placeholder = 'Pick a date and time',
    disabled = false,
    className,
    timezone,
}: DateTimePickerProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [hours, setHours] = useState<number>(() => {
        if (!value) return 0;
        const timeToFormat = timezone ? toZonedTime(value, timezone) : value;
        return parseInt(format(timeToFormat, 'HH'), 10);
    });
    const [minutes, setMinutes] = useState<number>(() => {
        if (!value) return 0;
        const timeToFormat = timezone ? toZonedTime(value, timezone) : value;
        return parseInt(format(timeToFormat, 'mm'), 10);
    });

    // Update local state when value prop changes
    useEffect(() => {
        if (value) {
            setSelectedDate(value);
            if (timezone) {
                const zonedTime = toZonedTime(value, timezone);
                setHours(parseInt(format(zonedTime, 'HH'), 10));
                setMinutes(parseInt(format(zonedTime, 'mm'), 10));
            } else {
                setHours(parseInt(format(value, 'HH'), 10));
                setMinutes(parseInt(format(value, 'mm'), 10));
            }
        }
    }, [value, timezone]);

    const updateDateTime = (date: Date, hours: number, minutes: number) => {
        if (timezone) {
            // Stringify date as YYY-MM-DD in the target timezone
            const ymdString = format(toZonedTime(date, timezone), 'yyyy-MM-dd');
            const hoursStr = String(hours).padStart(2, '0');
            const minutesStr = String(minutes).padStart(2, '0');
            const dateString = `${ymdString} ${hoursStr}:${minutesStr}:00`;

            // Interpret this date string as being in the specified timezone and convert to UTC
            const utcDate = fromZonedTime(dateString, timezone);
            onChange?.(utcDate);
        } else {
            const newDateTime = new Date(date);
            newDateTime.setHours(hours, minutes, 0, 0);
            onChange?.(newDateTime);
        }
    };

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            updateDateTime(date, hours, minutes);
        } else {
            onChange?.(undefined);
        }
    };

    const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow empty string or numeric input only
        if (value === '' || /^\d{0,3}$/.test(value)) {
            let numericValue = value === '' ? 0 : parseInt(value, 10);

            // Clamp to 0-23 range
            if (numericValue < 0) {
                numericValue = 0;
            } else if (numericValue > 23) {
                numericValue = 23;
            }

            setHours(numericValue);

            // Update datetime immediately if date is selected
            if (selectedDate) {
                updateDateTime(selectedDate, numericValue, minutes);
            }
        }
    };

    const handleHoursBlur = () => {
        if (selectedDate) {
            updateDateTime(selectedDate, hours, minutes);
        }
    };

    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow empty string or numeric input only
        if (value === '' || /^\d{0,3}$/.test(value)) {
            let numericValue = value === '' ? 0 : parseInt(value, 10);

            // Clamp to 0-59 range
            if (numericValue < 0) {
                numericValue = 0;
            } else if (numericValue > 59) {
                numericValue = 59;
            }

            setMinutes(numericValue);

            // Update datetime immediately if date is selected
            if (selectedDate) {
                updateDateTime(selectedDate, hours, numericValue);
            }
        }
    };

    const handleMinutesBlur = () => {
        if (selectedDate) {
            updateDateTime(selectedDate, hours, minutes);
        }
    };

    return (
        <div className={cn('flex flex-row gap-4', className)}>
            <div>
                <DatePicker
                    date={selectedDate}
                    onDateChange={handleDateChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    timezone={timezone}
                />
            </div>
            <div className="flex items-center gap-2">
                <LucideClock className="h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    inputMode="numeric"
                    value={hours.toString().padStart(2, '0')}
                    onChange={handleHoursChange}
                    onBlur={handleHoursBlur}
                    placeholder="HH"
                    disabled={disabled}
                    className="w-12 text-center"
                    maxLength={3}
                />
                <span className="text-muted-foreground">:</span>
                <Input
                    type="text"
                    inputMode="numeric"
                    value={minutes.toString().padStart(2, '0')}
                    onChange={handleMinutesChange}
                    onBlur={handleMinutesBlur}
                    placeholder="MM"
                    disabled={disabled}
                    className="w-12 text-center"
                    maxLength={3}
                />
            </div>
        </div>
    );
}
