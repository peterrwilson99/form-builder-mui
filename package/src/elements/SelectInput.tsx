import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { FC, useState } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { DependentProps, Element } from "./Components";

export interface Option {
    value: string;
    label: string;
}

export interface SelectInputProps extends Element {
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value: string;
    variant?: "standard" | "filled" | "outlined";
    options: Option[];
    onChange: (id: number, value: string) => void;
    disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = (props) => {
    const { id, prompt, additional, label, required, value, variant, options, onChange, disabled } = props;
    const [localValue, setValue] = useState<string>(value);

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
