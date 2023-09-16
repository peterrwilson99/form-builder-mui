import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material';

export interface OptionType {
    value: string;
    label: string;
}

export interface CheckboxesProps {
    id: string | number;
    prompt: string;
    options?: OptionType[];
    value?: Record<string, boolean>;
    onChange: (id: string | number, value: Record<string, boolean>) => void;
    disabled?: boolean;
}

const Checkboxes: FC<CheckboxesProps> = ({ id, prompt, value, options, onChange, disabled }) => {
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
        <Box sx={{marginY: "16px"}}>
            <Typography variant="h6" gutterBottom>
                {prompt}
            </Typography>
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
                        '& .MuiFormControlLabel-label': {
                            maxWidth: '85%', // Max width for the label text
                            wordWrap: 'break-word', // Allow text to wrap
                            },
                        }}
                />
            ))}
        </Box>
    )
}

export default Checkboxes;
