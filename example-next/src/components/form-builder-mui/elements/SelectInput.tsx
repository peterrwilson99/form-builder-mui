import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { FC, useState, useEffect } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { SelectInputElement, OptionType } from "./Components";

export interface SelectInputProps extends SelectInputElement {
    onChange: (id: number, value: string) => void;
    disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = (props) => {
    const { id, prompt, additional, label, required, value, variant, options, onChange, disabled } = props;
    // Ensure value is a string for SelectInput component
    const stringValue = typeof value === 'string' ? value : '';
    const [localValue, setValue] = useState<string>(stringValue);

    // Sync local state with external value prop
    useEffect(() => {
        const newStringValue = typeof value === 'string' ? value : '';
        setValue(newStringValue);
    }, [value]);

    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <QuestionPromptText prompt={prompt} required={required ?? false} />
            <RenderMarkdown markdown={additional} />
            <FormControl fullWidth required={required}>
                <InputLabel
                    id={id + "-label"}
                    sx={{ "& .MuiInputLabel-asterisk": { display: "none" } }} // Hide the asterisk
                >
                    {label}
                </InputLabel>
                <Select
                    labelId={id + "-label"}
                    id={String(id)}
                    value={localValue}
                    variant={variant ?? "standard"}
                    onChange={handleChange}
                    label={prompt}
                    disabled={disabled}
                    fullWidth
                    sx={{ wordWrap: "break-word" }}
                >
                    {(options ?? []).map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectInput;
