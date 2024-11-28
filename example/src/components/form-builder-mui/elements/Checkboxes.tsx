import { useState, ChangeEvent, FC } from "react";
import { Checkbox, FormControlLabel, Box, FormControl, FormLabel, FormGroup, FormHelperText } from "@mui/material";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { DependentProps } from "./Components";

export interface OptionType {
    value: string;
    label: string;
}

export interface CheckboxesProps {
    id: number;
    prompt: string;
    additional?: string;
    label?: string;
    options?: OptionType[];
    value?: Record<string, boolean>;
    onChange: (id: number, value: Record<string, boolean>) => void;
    disabled?: boolean;
    required?: boolean;
    dependentProperties?: DependentProps;
}

const Checkboxes: FC<CheckboxesProps> = ({ id, prompt, additional, label, value, options, onChange, disabled, required }) => {
    const [valuesChanged, setValuesChanged] = useState<boolean>(false);
    const [localValue, setValue] = useState<Record<string, boolean>>(value ?? {});

    const handleChange = (option: OptionType) => (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = { ...localValue, [option.value]: event.target.checked };
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
                                    checked={localValue[option.value] || false}
                                    onChange={handleChange(option)}
                                    name={option.label}
                                    disabled={disabled}
                                    color="primary"
                                />
                            }
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
                    {required ? <FormHelperText>{error ? "Please select at least one value" : ""}</FormHelperText> : <></>}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default Checkboxes;
