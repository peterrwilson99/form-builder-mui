import React, { useState, ChangeEvent, FC } from 'react';
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material';

interface OptionType {
    value: string;
    label: string;
}

interface CheckboxesProps {
    id: string | number;
    prompt: string;
    options?: OptionType[];
    onChange: (id: string | number, value: Record<string, boolean>) => void;
    disabled?: boolean;
}

const Checkboxes: FC<CheckboxesProps> = ({ id, prompt, options, onChange, disabled }) => {
    const [value, setValue] = useState<Record<string, boolean>>({});

    const handleChange = (option: OptionType) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...value, [option.value]: event.target.checked };
        setValue(newValue);
        onChange(id, newValue);
    };

    return (
        <Box sx={{marginY: "16px"}}>
            <Typography variant="h6" gutterBottom>
                {prompt}
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
        </Box>
    )
}

export default Checkboxes;
