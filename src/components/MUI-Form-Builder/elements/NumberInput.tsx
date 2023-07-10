import { Typography, TextField as MUITextField } from '@mui/material';
import React, { FC, useState, ChangeEvent } from 'react'

interface NumberInputProps {
    id: string;
    question: string;
    required?: boolean;
    variant: 'standard' | 'outlined' | 'filled';
    valueProp: string;
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const NumberInput: FC<NumberInputProps> = (props) => {
    const { id, question, required, variant, valueProp, onChange, disabled } = props;
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
            <MUITextField
                id={question}
                label={question}
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