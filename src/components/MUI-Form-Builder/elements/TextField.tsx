import { Typography, TextField as MUITextField } from '@mui/material';
import React, { FC, useState, ChangeEvent } from 'react'

interface TextFieldProps {
    id: string;
    prompt: string;
    required?: boolean;
    variant: 'standard' | 'filled' | 'outlined';
    defaultValue: string;
    multiline?: boolean;
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const TextField: FC<TextFieldProps> = (props) => {
    const { id, prompt, required, variant, defaultValue, multiline, onChange, disabled } = props
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
                value={value}
                multiline={multiline}
                onChange={handleChange}
                disabled={disabled}
                fullWidth
            />
        </div>
    )
}

export default TextField
