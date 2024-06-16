import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import QuestionPromptText from '../helperComponents/QuestionPromptText';

export interface DateInputProps {
    id: string | number;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value?: string;
    format?: 'time' | 'datetime-local';
    onChange: (id: string | number, value: string) => void;
    disabled?: boolean;
}

const DateInput: FC<DateInputProps> = ({ id, prompt, additional, label, required, value, format, onChange, disabled }) => {
    const [localValue, setValue] = useState<string>(value ?? '');

    useEffect(() => {
        setValue(value ?? '');
    }, [value])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    let type: TextFieldProps['type'] = "date";
    const date = new Date();
    let timeDefault = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    switch(format) {
        case "time":
            type = "time";
            timeDefault = `${date.getHours()}:${date.getMinutes()}`;
            break;
        case "datetime-local":
            type = "datetime-local";
            timeDefault = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
            break;
        default:
            break;
    }

    return (
        <Box sx={{marginY: "2.5rem"}}>
            <QuestionPromptText prompt={prompt} required={required ?? false}/>
            <Typography variant="subtitle2" sx={{marginBottom: "16px"}}>
                {additional}
            </Typography>
            <TextField
                label={label}
                type={type}
                value={localValue ?? timeDefault}
                onChange={handleChange}
                required={required}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={format === "time" ? { step: 300 } : {}}
                disabled={disabled}
            />
        </Box>
    );
}

export default DateInput;
