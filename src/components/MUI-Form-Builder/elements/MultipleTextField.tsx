import React, { FC, useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface MultipleTextFieldProps {
    id: string;
    question: string;
    required?: boolean;
    onChange: (id: string, values: string[]) => void;
    disabled?: boolean;
}

const MultipleTextField: FC<MultipleTextFieldProps> = ({ id, question, required, onChange, disabled }) => {
    const [values, setValues] = useState<string[]>(['']);

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
        <div className="my-4">
            <h6>{question}</h6>
            {values.map((value, index) => (
                <div key={index} className="d-flex align-items-center my-4">
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
                </div>
            ))}
        </div>
    );
}

export default MultipleTextField;