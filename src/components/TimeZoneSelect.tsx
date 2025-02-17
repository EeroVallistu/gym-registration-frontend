import React from 'react';
import { timeZones } from '../utils/timezones';

interface TimeZoneSelectProps {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({ value, onChange, required }) => {
    const [isEnabled, setIsEnabled] = React.useState(!!value);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsEnabled(e.target.checked);
        if (!e.target.checked) {
            onChange('');
        } else {
            // Convert local timezone to UTC format
            const offset = -new Date().getTimezoneOffset() / 60;
            const utcString = `UTC${offset >= 0 ? '+' : ''}${offset}`;
            onChange(utcString);
        }
    };

    return (
        <div className="timezone-select-container">
            <div className="timezone-checkbox">
                <input
                    type="checkbox"
                    id="useTimezone"
                    checked={isEnabled}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="useTimezone">Set timezone</label>
            </div>
            {isEnabled && (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className="timezone-select"
                >
                    <option value="">Select timezone</option>
                    {timeZones.map(zone => (
                        <option key={zone} value={zone}>
                            {zone}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};
