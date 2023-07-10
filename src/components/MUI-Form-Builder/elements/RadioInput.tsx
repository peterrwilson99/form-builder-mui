import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { FC, useState, ChangeEvent } from 'react'

interface Option {
    value: string;
    label: string;
}

interface RadioInputProps {
    id: string;
    question: string;
    required?: boolean;
    valueProp: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const RadioInput: FC<RadioInputProps> = (props) => {
    const { id, question, required, valueProp, options, onChange, disabled } = props
    const [value, setValue] = useState<string>(valueProp);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <div className="my-4" >
            <Typography variant="h6" gutterBottom>
                {question}
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
        </div>
    )
}

export default RadioInput