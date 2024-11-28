import { TextField as MUITextField, Box } from "@mui/material";
import { FC, useState, ChangeEvent } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { DependentProps } from "./Components";

export interface NumberInputProps {
    id: string;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    variant: "standard" | "outlined" | "filled";
    value: string;
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
    dependentProperties?: DependentProps;
}

const NumberInput: FC<NumberInputProps> = (props) => {
    const { id, prompt, additional, label, required, variant, value, onChange, disabled } = props;
    const [localValue, setValue] = useState<string>(value);

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
