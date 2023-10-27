import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';

export interface MultipleTextFieldProps {
    id: string;
    value: string[];
    prompt: string;
    required?: boolean;
    variant?: "standard" | "filled" | "outlined";
    onChange: (id: string, values: string[]) => void;
    disabled?: boolean;
    min?: string;
    max?: string;
}

const MultipleTextField: FC<MultipleTextFieldProps> = ({ id, value, prompt, variant, required, onChange, disabled, max, min }) => {
    const defaultValues = () => {
        if (!min) return [''];
        return Array(parseInt(min)).fill('');
    }
    const [values, setValues] = useState<string[]>(defaultValues);
    
    useEffect(() => {
        setValues(value ?? defaultValues);
    }, [value, min]);

    const handleAddField = () => {
        setValues([...values, '']);
    }

    const handleRemoveField = (index: number) => {
        setValues(values.filter((value, idx) => idx !== index));
    }

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
        onChange(id, newValues);
    };

    return (
        <Box sx={{marginY: "2.5rem"}}>
            <Typography variant="h6">{prompt}</Typography>
            {values.map((value, index) => (
                <Box key={index} sx={{display: "flex", justifyContent: "center", marginY: "16px"}} className="d-flex align-items-center my-4">
                    <TextField
                        required={required}
                        value={value}
                        variant={variant ?? "standard"}
                        onChange={(event) => handleChange(index, event)}
                        fullWidth
                        disabled={disabled}
                    />
                    {index === values.length - 1 && (
                        // strict comparison is not working for some reason
                        <IconButton color="primary" disabled={disabled || ((max && values.length >= parseInt(max)) || undefined)} onClick={handleAddField}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    )}
                    {index > 0 && index === values.length - 1 && (
                        // same as above, strict comparison not working
                        <IconButton color="secondary" disabled={disabled || ((min && values.length <= parseInt(min)) || undefined)} onClick={() => handleRemoveField(index)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    );
}

export default MultipleTextField;