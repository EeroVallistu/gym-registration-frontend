import React, { useState, useEffect } from 'react';
import { CreateRoutineDto, TimeSlot, routinesService } from '../services/routines.service';
import { TimeInput } from './TimeInput';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

interface RoutineFormProps {
    onSuccess?: () => void;
    initialUserId?: string;
}

export const RoutineForm: React.FC<RoutineFormProps> = ({ onSuccess, initialUserId }) => {
    useEffect(() => {
        // Force 24-hour time format
        try {
            document.querySelector('input[type="time"]')
                ?.setAttribute('data-form-type', '24h');
        } catch (error) {
            console.error('Failed to set time format:', error);
        }
    }, []);

    const [formData, setFormData] = useState<CreateRoutineDto>({
        userId: initialUserId || '',
        availability: []
    });

    const [selectedDay, setSelectedDay] = useState<TimeSlot['day']>('monday');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const handleTimeChange = (type: 'start' | 'end', value: string) => {
        if (type === 'start') {
            setStartTime(value);
        } else {
            setEndTime(value);
        }
    };

    const handleAddTimeSlot = () => {
        const hasOverlap = formData.availability.some(slot => 
            slot.day === selectedDay && 
            ((startTime >= slot.startTime && startTime <= slot.endTime) ||
             (endTime >= slot.startTime && endTime <= slot.endTime))
        );

        if (hasOverlap) {
            alert('This time slot overlaps with an existing slot for this day');
            return;
        }

        setFormData(prev => ({
            ...prev,
            availability: [...prev.availability, {
                day: selectedDay,
                startTime,
                endTime
            }]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await routinesService.createRoutine(formData);
            setFormData({ userId: '', availability: [] });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Failed to create routine:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="routine-form">
            <h3>Add New Routine</h3>
            
            <div>
                <label>Trainee ID:</label>
                <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                    placeholder="Paste trainee ID here"
                    required
                />
            </div>

            <div className="time-slot-selector">
                <div>
                    <label>Day:</label>
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value as TimeSlot['day'])}
                    >
                        {DAYS.map(day => (
                            <option key={day} value={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="time-inputs">
                    <TimeInput
                        value={startTime}
                        onChange={(value) => handleTimeChange('start', value)}
                        label="Start Time"
                    />
                    <TimeInput
                        value={endTime}
                        onChange={(value) => handleTimeChange('end', value)}
                        label="End Time"
                    />
                </div>

                <button type="button" onClick={handleAddTimeSlot} className="add-slot-button">
                    Add Time Slot
                </button>
            </div>

            <div className="selected-slots">
                <h4>Selected Time Slots:</h4>
                {formData.availability.map((slot, index) => (
                    <div key={index} className="time-slot-item">
                        <span>
                            {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}: {slot.startTime} - {slot.endTime}
                        </span>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                                ...prev,
                                availability: prev.availability.filter((_, i) => i !== index)
                            }))}
                            className="remove-slot-button"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <button type="submit" className="submit-button" disabled={formData.availability.length === 0}>
                Create Routine
            </button>
        </form>
    );
};
