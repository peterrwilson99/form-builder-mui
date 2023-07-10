import React, { useState, ChangeEvent, FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Typography } from '@mui/material';

interface DateInputProps {
    id: string | number;
    question: string;
    required?: boolean;
    valueProp?: string;
    format?: 'time' | 'datetime-local';
    onChange: (id: string | number, value: string) => void;
    disabled?: boolean;
}

const DateInput: FC<DateInputProps> = ({ id, question, required, valueProp, format, onChange, disabled }) => {
    const [value, setValue] = useState<string>(valueProp || '');
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    let type: TextFieldProps['type'] = "date";
    let defaultValue = "2017-05-24";
    switch(format) {
        case "time":
            type = "time";
            defaultValue = "07:30";
            break;
        case "datetime-local":
            type = "datetime-local";
            defaultValue = "2017-05-24T10:30";
            break;
        default:
            break;
    }

    return (
        <div className="my-4">
            <Typography variant="h6" className="mb-4">
                {question}
            </Typography>
            <TextField
                id={id.toString()}
                label={question}
                type={type}
                defaultValue={valueProp ?? defaultValue}
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
        </div>
    );
}

export default DateInput;
