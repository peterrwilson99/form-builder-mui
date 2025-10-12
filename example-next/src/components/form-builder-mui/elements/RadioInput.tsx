import { RadioGroup, FormControlLabel, Radio, Box, FormControl, FormLabel } from "@mui/material";
import { FC, useState, useEffect } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { RadioInputElement, OptionType } from "./Components";

export interface RadioInputProps extends RadioInputElement {
    onChange: (id: number, value: string) => void;
    disabled?: boolean;
}

const RadioInput: FC<RadioInputProps> = (props) => {
    const { id, prompt, additional, label, required, value, options, onChange, disabled } = props;
    // Ensure value is a string for RadioInput component
    const stringValue = typeof value === 'string' ? value : '';
    const [localValue, setValue] = useState<string>(stringValue);

    // Sync local state with external value prop
    useEffect(() => {
        const newStringValue = typeof value === 'string' ? value : '';
        setValue(newStringValue);
    }, [value]);

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
