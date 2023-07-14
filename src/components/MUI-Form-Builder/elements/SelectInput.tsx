import { Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import React, { FC, useState } from 'react'

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    prompt: string;
    required?: boolean;
    defaultValue: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = (props) => {
    const { id, prompt, required, defaultValue, options, onChange, disabled } = props
    const [value, setValue] = useState<string>(defaultValue);

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
                    value={value}
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