import { Typography, TextField as MUITextField, Box } from '@mui/material';
import React, { FC, useState, ChangeEvent, useEffect } from 'react'

export interface NumberInputProps {
    id: string;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    variant: 'standard' | 'outlined' | 'filled';
    value: string;
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const NumberInput: FC<NumberInputProps> = (props) => {
    const { id, prompt, additional, label, required, variant, value, onChange, disabled } = props;
    const [localValue, setValue] = useState<string>(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = String(Number(e.target.value));
        setValue(value);
        onChange(id, value);
    };

    return (
        <Box sx={{marginY: "2.5rem"}} >
            <Typography variant="body1" gutterBottom>
                {prompt}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {additional}
            </Typography>
            <MUITextField
                id={prompt}
                label={label}
                required={required}
                variant={variant}
                type="number"
                value={localValue}
                onChange={handleChange}
                disabled={disabled}
                fullWidth
            />
        </Box>
    )
}

export default NumberInput