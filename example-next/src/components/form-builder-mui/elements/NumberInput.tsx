import { TextField as MUITextField, Box } from "@mui/material";
import { FC, useState, ChangeEvent, useEffect } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { NumberInputElement } from "./Components";

export interface NumberInputProps extends NumberInputElement {
    onChange: (id: number, value: string) => void;
    disabled?: boolean;
}

const NumberInput: FC<NumberInputProps> = (props) => {
    const { id, prompt, additional, label, required, variant, value, onChange, disabled } = props;
    // Ensure value is a string for NumberInput component
    const stringValue = typeof value === 'string' ? value : '';
    const [localValue, setValue] = useState<string>(stringValue);

    // Sync local state with external value prop
    useEffect(() => {
        const newStringValue = typeof value === 'string' ? value : '';
        setValue(newStringValue);
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = String(Number(e.target.value));
        setValue(value);
        onChange(id, value);
    };

    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <QuestionPromptText prompt={prompt} required={required ?? false} />
            <RenderMarkdown markdown={additional} />
            <MUITextField
                id={prompt}
                label={label}
                required={required}
                variant={variant}
                type="number"
                value={localValue}
                onChange={handleChange}
                disabled={disabled}
                fullWidth
            />
        </Box>
    );
};

export default NumberInput;
