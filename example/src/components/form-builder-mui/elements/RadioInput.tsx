import { Typography, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import React, { FC, useState, useEffect, ChangeEvent } from 'react'

export interface Option {
    value: string;
    label: string;
}

export interface RadioInputProps {
    id: string;
    prompt: string;
    required?: boolean;
    value: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const RadioInput: FC<RadioInputProps> = (props) => {
    const { id, prompt, required, value, options, onChange, disabled } = props
    const [localValue, setValue] = useState<string>(value);

    useEffect(() => {
        setValue(value);
    }, [value])

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
                value={localValue}
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