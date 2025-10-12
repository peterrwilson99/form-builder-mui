import { useState, ChangeEvent, FC, useEffect } from "react";
import { Checkbox, FormControlLabel, Box, FormControl, FormLabel, FormGroup, FormHelperText } from "@mui/material";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { CheckboxesElement, OptionType } from "./Components";

export interface CheckboxesProps extends CheckboxesElement {
    onChange: (id: number, value: Record<string, boolean>) => void;
    disabled?: boolean;
}

const Checkboxes: FC<CheckboxesProps> = ({ id, prompt, additional, label, value, options, onChange, disabled, required }) => {
    const [valuesChanged, setValuesChanged] = useState<boolean>(false);
    // Ensure value is a Record<string, boolean> for Checkboxes component
    const recordValue = typeof value === 'object' && value !== null && !Array.isArray(value) 
        ? value as Record<string, boolean> 
        : {};
    const [localValue, setValue] = useState<Record<string, boolean>>(recordValue);

    // Sync local state with external value prop
    useEffect(() => {
        const newRecordValue = typeof value === 'object' && value !== null && !Array.isArray(value) 
            ? value as Record<string, boolean> 
            : {};
        setValue(newRecordValue);
    }, [value]);

    const handleChange = (option: OptionType) => (event: ChangeEvent<HTMLInputElement>) => {
        const optionValue = String(option.value ?? '');
        const newValue = { ...localValue, [optionValue]: event.target.checked };
        setValuesChanged(true);
        setValue(newValue);
        onChange(id, newValue);
    };

    const error = Object.values(localValue).filter((v) => v).length === 0 && required && valuesChanged;

    return (
        <Box sx={{ marginY: "2.5rem", maxWidth: "400px" }}>
            <QuestionPromptText prompt={prompt} required={required ?? false} />
            <RenderMarkdown markdown={additional} />
            <FormControl fullWidth error={error} required={required}>
                <FormLabel
                    component="legend"
                    sx={{ "& .MuiFormLabel-asterisk": { display: "none" } }} // Hide the asterisk
                >
                    {label}
                </FormLabel>
                <FormGroup>
                    {(options ?? []).map((option, index) => (
                        <FormControlLabel
                            key={index}
                            disabled={disabled}
                            control={
                                <Checkbox
                                    checked={localValue[String(option.value ?? '')] || false}
                                    onChange={handleChange(option)}
                                    name={String(option.label ?? '')}
                                    disabled={disabled}
                                    color="primary"
                                />
                            }
                            label={String(option.label ?? '')}
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
                    {required ? <FormHelperText>{error ? "Please select at least one value" : ""}</FormHelperText> : <></>}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default Checkboxes;
