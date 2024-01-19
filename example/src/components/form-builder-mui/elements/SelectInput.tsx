import { Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import React, { FC, useState, useEffect } from 'react'

export interface Option {
    value: string;
    label: string;
}

export interface SelectInputProps {
    id: string;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value: string;
    variant?: "standard" | "filled" | "outlined";
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = (props) => {
    const { id, prompt, additional, label, required, value, variant, options, onChange, disabled } = props
    const [localValue, setValue] = useState<string>(value);

    useEffect(() => {
        setValue(value);
    }, [value])

    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <Box sx={{marginY: "2.5rem"}}>
            <Typography variant="body1" gutterBottom>
                {prompt}
            </Typography>
            <Typography variant="subtitle2" sx={{ marginBottom: "16px" }}>
                {additional}
            </Typography>
            <FormControl fullWidth required={required}>
                <InputLabel id={id + "-label"}>{label}</InputLabel>
                <Select
                    labelId={id + "-label"}
                    id={id}
                    value={localValue}
                    variant={variant ?? "standard"}
                    onChange={handleChange}
                    label={prompt}
                    disabled={disabled}
                    fullWidth
                    sx={{wordWrap: "break-word"}}
                >
                    {(options ?? []).map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput