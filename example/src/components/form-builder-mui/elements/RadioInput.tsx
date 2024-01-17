import { Typography, RadioGroup, FormControlLabel, Radio, Box, FormControl, FormLabel } from '@mui/material';
import React, { FC, useState, useEffect, ChangeEvent } from 'react'

export interface Option {
    value: string;
    label: string;
}

export interface RadioInputProps {
    id: string;
    prompt: string;
    label?: string;
    required?: boolean;
    value: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const RadioInput: FC<RadioInputProps> = (props) => {
    const { id, prompt, label, required, value, options, onChange, disabled } = props
    const [localValue, setValue] = useState<string>(value);

    useEffect(() => {
        setValue(value);
    }, [value])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <Box sx={{marginY: "2.5rem"}} >
            <Typography variant="body1" fontStyle={'italic'} gutterBottom>
                {prompt}
            </Typography>
            <FormControl fullWidth required={required}>
                <FormLabel component="legend">{label}</FormLabel>
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
                            control={<Radio disabled={disabled}/>}
                            label={option.label}
                            sx={{maxWidth: "400px",
                                 width: "90%",
                                '& .MuiFormControlLabel-label': {
                                    maxWidth: '95%', // Max width for the label text
                                    wordWrap: 'break-word', // Allow text to wrap
                                },
                                }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default RadioInput