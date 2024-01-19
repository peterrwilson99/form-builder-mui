import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import { Typography, Checkbox, FormControlLabel, Box, FormControl, FormLabel } from '@mui/material';

export interface OptionType {
    value: string;
    label: string;
}

export interface CheckboxesProps {
    id: string | number;
    prompt: string;
    label?: string;
    options?: OptionType[];
    value?: Record<string, boolean>;
    onChange: (id: string | number, value: Record<string, boolean>) => void;
    disabled?: boolean;
    required?: boolean;
}

const Checkboxes: FC<CheckboxesProps> = ({ id, prompt, label, value, options, onChange, disabled, required }) => {
    const [localValue, setValue] = useState<Record<string, boolean>>(value ?? {});

    useEffect(() => {
        setValue(value ?? {});
    }, [value])

    const handleChange = (option: OptionType) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...localValue, [option.value]: event.target.checked };
        setValue(newValue);
        onChange(id, newValue);
    };

    return (
        <Box sx={{marginY: "2.5rem", maxWidth: "400px"}}>
            <Typography variant="body1" gutterBottom>
                {prompt}
            </Typography>
            <FormControl fullWidth required={required}>
                <FormLabel component="legend">{label}</FormLabel>
                {(options ?? []).map((option, index) => (
                    <FormControlLabel
                        key={index}
                        disabled={disabled}
                        control={
                            <Checkbox
                                checked={localValue[option.value] || false}
                                onChange={handleChange(option)}
                                name={option.label}
                                disabled={disabled}
                                color="primary"
                            />
                        }
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
            </FormControl>
        </Box>
    )
}

export default Checkboxes;
