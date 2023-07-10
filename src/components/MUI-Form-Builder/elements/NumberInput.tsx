import { Typography, TextField as MUITextField } from '@mui/material';
import React, { FC, useState, ChangeEvent } from 'react'

interface NumberInputProps {
    id: string;
    prompt: string;
    required?: boolean;
    variant: 'standard' | 'outlined' | 'filled';
    defaultValue: string;
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const NumberInput: FC<NumberInputProps> = (props) => {
    const { id, prompt, required, variant, defaultValue, onChange, disabled } = props;
    const [value, setValue] = useState<string>(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <div className="my-4" >
            <Typography variant="h6" gutterBottom>
                {prompt}
            </Typography>
            <MUITextField
                id={prompt}
                label={prompt}
                required={required}
                variant={variant}
                type="number"
                value={value}
                onChange={handleChange}
                disabled={disabled}
                fullWidth
            />
        </div>
    )
}

export default NumberInput