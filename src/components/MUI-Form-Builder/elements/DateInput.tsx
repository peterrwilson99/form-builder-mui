import React, { useState, ChangeEvent, FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';

interface DateInputProps {
    id: string | number;
    prompt: string;
    required?: boolean;
    defaultValue?: string;
    format?: 'time' | 'datetime-local';
    onChange: (id: string | number, value: string) => void;
    disabled?: boolean;
}

const DateInput: FC<DateInputProps> = ({ id, prompt, required, defaultValue, format, onChange, disabled }) => {
    const [value, setValue] = useState<string>(defaultValue || '');
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    let type: TextFieldProps['type'] = "date";
    let timeDefault = "2017-05-24";
    switch(format) {
        case "time":
            type = "time";
            timeDefault = "07:30";
            break;
        case "datetime-local":
            type = "datetime-local";
            timeDefault = "2017-05-24T10:30";
            break;
        default:
            break;
    }

    return (
        <Box sx={{marginY: "16px"}}>
            <Typography variant="h6" sx={{marginBottom: "16px"}}>
                {prompt}
            </Typography>
            <TextField
                id={id.toString()}
                label={prompt}
                type={type}
                defaultValue={defaultValue ?? timeDefault}
                value={value}
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
