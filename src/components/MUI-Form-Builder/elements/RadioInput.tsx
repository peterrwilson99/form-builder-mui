import { Typography, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import React, { FC, useState, ChangeEvent } from 'react'

interface Option {
    value: string;
    label: string;
}

interface RadioInputProps {
    id: string;
    prompt: string;
    required?: boolean;
    defaultValue: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const RadioInput: FC<RadioInputProps> = (props) => {
    const { id, prompt, required, defaultValue, options, onChange, disabled } = props
    const [value, setValue] = useState<string>(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <Box sx={{marginY: "16px"}} >
            <Typography variant="h6" gutterBottom>
                {prompt}
            </Typography>
            <RadioGroup
                id={id}
                value={value}
                onChange={handleChange}
            >
                {(options ?? []).map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        disabled={disabled}
                        control={<Radio disabled={disabled} required={required} />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </Box>
    )
}

export default RadioInput