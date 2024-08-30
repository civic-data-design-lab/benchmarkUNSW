import React from "react";
import { useState, useEffect } from "react";
import { Slider, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function convertNumberToHour(number: number): string {
    const hours = Math.floor(number);
    const minutes = Math.round((number - hours) * 60);

    const formattedHours = (hours % 12).toString().padStart(2, '0');
    const meridiemSuffix: string = number > 12 ? 'PM' : 'AM'

    return `${formattedHours}:00 ${meridiemSuffix}`;
}

function dateToString(date: Date): string {
    const day: number = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year: number = date.getFullYear()

    const formattedDate = `${month} ${day}`;

    return formattedDate

}

const TimeSlider = ({ setTargetHour, setCurrentHour, currentHour }) => {
    const [value, setValue] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentHour((prevValue) => {
                    // If slider reaches the maximum value, stop playing
                    if (prevValue >= 24) {
                        return 6;
                    }
                    return prevValue + 1;
                });
                setTargetHour((prevValue) => {
                    // If slider reaches the maximum value, stop playing
                    if (prevValue >= 24) {
                        setIsPlaying(false);
                        return 6;
                    }
                    return prevValue + 1;
                });
            }, 100); // Adjust the speed as needed
        } else if (!isPlaying && interval !== null) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying]);

    const handleSliderChange = (event) => {
        setCurrentHour(event.target.value);
        setTargetHour(parseInt(event.target.value))
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{
            width: '80%'
        }}>
            <Slider
                aria-label="Time"
                defaultValue={currentHour}
                valueLabelDisplay="on"
                step={1}
                onChange={handleSliderChange}
                style={{
                    color: '#FF2551'
                }}
                marks
                min={6}
                max={24}
            />
            <Button
                onClick={togglePlay}
                style={{ backgroundColor: '#FF2551' }}
                variant="contained"
                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            >
            </Button>
        </div>
    );
}

function DateDropdown({ setTargetDate, startDate, currentHour }) {
    const [selectedDate, setSelectedDate] = useState(''); // Initial state for the selected date

    // Generate an array of dates (e.g., for the current month)
    const generateDates = (startDate: string, numberOfDays: number) => {
        const dates: Array<Date> = [];
        for (let i = 0; i < numberOfDays; i++) {
            const date: Date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date)
        }
        return dates;
    };

    const dates = generateDates(startDate, 10); // Example: Generate dates for the next 30 days

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setTargetDate(event.target.value)
    };

    return (
        <div
            className="nova-mono-regular "
            style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
            }}
        >

            <FormControl fullWidth>
                <InputLabel id="time-selector-label"
                    style={{
                        fontFamily: '"Nova Mono", monospace',
                        color: '#FF2551',

                    }}>Date</InputLabel>
                <Select
                    labelId="time-selector-label"
                    id="time-selector"
                    value={selectedDate}
                    label="Date"
                    onChange={handleDateChange}
                    style={{
                        fontFamily: '"Nova Mono", monospace',
                        color: '#FF2551',
                        backgroundColor: '#ffffff',
                        borderRadius: '1.5rem',

                    }}
                >
                    {dates.map((date, index) => (
                        <MenuItem key={index} value={date.toISOString()}
                            style={{ fontFamily: '"Nova Mono", monospace', color: '#FF2551', textAlign: 'center' }}>
                            {`${dateToString(date)}, ${convertNumberToHour(currentHour)}`}
                        </MenuItem>
                    ))}


                </Select>
            </FormControl>
        </div>
    );
}
const DateSelector = ({ setTargetHour, setTargetDate, startDate }) => {
    const [hour, setHour] = useState(0); // Initial state set to 0
    return (
        <div
            style={{
                zIndex: 3,
                position: 'relative',
                backgroundColor: '#FFDAE2',
                padding: '1rem',
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                gap: '2rem'

            }}>
            <DateDropdown setTargetDate={setTargetDate} startDate={startDate} currentHour={hour} />
            <TimeSlider setTargetHour={setTargetHour} setCurrentHour={setHour} currentHour={hour} />

        </div>
    )
}
export default DateSelector