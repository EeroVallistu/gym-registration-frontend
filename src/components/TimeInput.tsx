import React from 'react';

interface TimeInputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, label }) => {
    const convertTo24Hour = (timeStr: string) => {
        // Remove any AM/PM and ensure HH:mm format
        const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        if (!match) return timeStr;

        const [, hours, minutes, meridiem] = match; // Use comma to skip unused first element
        let hoursNum = parseInt(hours, 10);

        // Convert to 24-hour format
        if (meridiem?.toUpperCase() === 'PM' && hoursNum < 12) {
            hoursNum += 12;
        } else if (meridiem?.toUpperCase() === 'AM' && hoursNum === 12) {
            hoursNum = 0;
        }

        return `${hoursNum.toString().padStart(2, '0')}:${minutes}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label>{label}</label>
            <select 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontFamily: 'monospace'
                }}
            >
                {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return (
                        <optgroup key={hour} label={`${hour}:00`}>
                            {[0, 15, 30, 45].map(min => {
                                const time = `${hour}:${min.toString().padStart(2, '0')}`;
                                return (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                );
                            })}
                        </optgroup>
                    );
                })}
            </select>
        </div>
    );
};
