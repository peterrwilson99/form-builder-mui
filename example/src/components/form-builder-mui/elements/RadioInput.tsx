import { Typography, RadioGroup, FormControlLabel, Radio, Box, FormControl, FormLabel } from "@mui/material";
import { FC, useState } from "react";

export interface Option {
    value: string;
    label: string;
}

export interface RadioInputProps {
    id: string;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value: string;
    options: Option[];
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const RadioInput: FC<RadioInputProps> = (props) => {
    const { id, prompt, additional, label, required, value, options, onChange, disabled } = props;
    const [localValue, setValue] = useState<string>(value);

    const handleChange = (e: any) => {
        const newValue = e.target.value === localValue ? "" : e.target.value;
        setValue(newValue);
        onChange(id, newValue);
    };

    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <Typography variant="body1" gutterBottom>
                {prompt}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {additional}
            </Typography>
            <FormControl fullWidth>
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup id={id} value={localValue}>
                    {(options ?? []).map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option.value}
                            disabled={disabled}
                            control={<Radio required={required} disabled={disabled} onClick={handleChange} />}
                            label={option.label}
                            sx={{
                                maxWidth: "400px",
                                width: "90%",
                                "& .MuiFormControlLabel-label": {
                                    maxWidth: "95%", // Max width for the label text
                                    wordWrap: "break-word", // Allow text to wrap
                                },
                            }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default RadioInput;
