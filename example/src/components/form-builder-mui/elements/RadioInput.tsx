import { RadioGroup, FormControlLabel, Radio, Box, FormControl, FormLabel } from "@mui/material";
import { FC, useState } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { DependentProps } from "./Components";

export interface Option {
    value: string;
    label: string;
}

export interface RadioInputProps {
    id: number;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value: string;
    options: Option[];
    onChange: (id: number, value: string) => void;
    disabled?: boolean;
    dependentProperties?: DependentProps;
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
            <QuestionPromptText prompt={prompt} required={required ?? false} />
            <RenderMarkdown markdown={additional} />
            <FormControl fullWidth required={required}>
                <FormLabel
                    component="legend"
                    sx={{ "& .MuiFormLabel-asterisk": { display: "none" } }} // Hide the asterisk
                >
                    {label}
                </FormLabel>
                <RadioGroup id={String(id)} value={localValue}>
                    {(options ?? []).map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option.value}
                            disabled={disabled}
                            control={<Radio disabled={disabled} onClick={handleChange} />}
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
