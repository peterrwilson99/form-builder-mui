import React, { FC, useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';

interface MultipleTextFieldProps {
    id: string;
    value: string[];
    prompt: string;
    required?: boolean;
    onChange: (id: string, values: string[]) => void;
    disabled?: boolean;
}

const MultipleTextField: FC<MultipleTextFieldProps> = ({ id, value, prompt, required, onChange, disabled }) => {
    const [values, setValues] = useState<string[]>(value ?? ['']);

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
        <Box sx={{marginY: "16px"}}>
            <Typography variant="h6">{prompt}</Typography>
            {values.map((value, index) => (
                <Box key={index} sx={{display: "flex", justifyContent: "center", marginY: "16px"}} className="d-flex align-items-center my-4">
                    <TextField
                        required={required}
                        value={value}
                        onChange={(event) => handleChange(index, event)}
                        fullWidth
                        disabled={disabled}
                    />
                    {index === values.length - 1 && (
                        <IconButton color="primary" disabled={disabled} onClick={handleAddField}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    )}
                    {index > 0 && index === values.length - 1 && (
                        <IconButton color="secondary" disabled={disabled} onClick={() => handleRemoveField(index)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    );
}

export default MultipleTextField;