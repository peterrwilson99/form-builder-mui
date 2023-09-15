import { Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import React, { FC, useState, useEffect } from 'react'

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    prompt: string;
    required?: boolean;
    value: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = (props) => {
    const { id, prompt, required, value, options, onChange, disabled } = props
    const [localValue, setValue] = useState<string>(value);

    useEffect(() => {
        setValue(value);
    }, [value])

    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <Box sx={{marginY: "16px"}}>
            <Typography variant="h6" gutterBottom>
                {prompt}
            </Typography>
            <FormControl fullWidth required={required}>
                <InputLabel id={id + "-label"}>{prompt}</InputLabel>
                <Select
                    labelId={id + "-label"}
                    id={id}
                    value={localValue}
                    onChange={handleChange}
                    label={prompt}
                    disabled={disabled}
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