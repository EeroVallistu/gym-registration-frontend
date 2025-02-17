import React from 'react';
import { timeZones } from '../utils/timezones';

interface TimeZoneSelectProps {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({ value, onChange, required }) => {
    const getOffset = (timezone: string) => {
        try {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                timeZoneName: 'short'
            });
            return formatter.format(date).split(' ').pop();
        } catch {
            return '';
        }
    };

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="timezone-select"
        >
            <option value="">Select timezone</option>
            {timeZones.map(zone => (
                <option key={zone} value={zone}>
                    {`${zone} (${getOffset(zone)})`}
                </option>
            ))}
        </select>
    );
};
