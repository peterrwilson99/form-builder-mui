import React, { useState, ChangeEvent, FC } from 'react';
import { Typography, Checkbox, FormControlLabel } from '@mui/material';

interface OptionType {
    value: string;
    label: string;
}

interface CheckboxesProps {
    id: string | number;
    question: string;
    options?: OptionType[];
    onChange: (id: string | number, value: Record<string, boolean>) => void;
    disabled?: boolean;
}

const Checkboxes: FC<CheckboxesProps> = ({ id, question, options, onChange, disabled }) => {
    const [value, setValue] = useState<Record<string, boolean>>({});

    const handleChange = (option: OptionType) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...value, [option.value]: event.target.checked };
        setValue(newValue);
        onChange(id, newValue);
    };

    return (
        <div className="my-4">
            <Typography variant="h6" gutterBottom>
                {question}
            </Typography>
            {(options ?? []).map((option, index) => (
                <FormControlLabel
                    key={index}
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={value[option.value] || false}
                            onChange={handleChange(option)}
                            name={option.label}
                            disabled={disabled}
                            color="primary"
                        />
                    }
                    label={option.label}
                />
            ))}
        </div>
    )
}

export default Checkboxes;
