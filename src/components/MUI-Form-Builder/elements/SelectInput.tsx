import { Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { FC, useState } from 'react'

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    question: string;
    required?: boolean;
    valueProp: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = (props) => {
    const { id, question, required, valueProp, options, onChange, disabled } = props
    const [value, setValue] = useState<string>(valueProp);

    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <div className="my-4">
            <Typography variant="h6" gutterBottom>
                {question}
            </Typography>
            <FormControl fullWidth required={required}>
                <InputLabel id={id + "-label"}>{question}</InputLabel>
                <Select
                    labelId={id + "-label"}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    label={question}
                    disabled={disabled}
                >
                    {(options ?? []).map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectInput