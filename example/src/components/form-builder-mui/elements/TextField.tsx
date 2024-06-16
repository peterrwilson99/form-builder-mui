import { Typography, TextField as MUITextField, Box } from "@mui/material";
import { FC, useState, ChangeEvent } from "react";
import QuestionPromptText from "../helperComponents/QuestionPromptText"

export interface TextFieldProps {
    id: string;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    variant: "standard" | "filled" | "outlined";
    value: string;
    multiline?: boolean;
    onChange: (id: string, value: string) => void;
    disabled?: boolean;
}

const TextField: FC<TextFieldProps> = (props) => {
    const { id, prompt, additional, label, required, variant, value, multiline, onChange, disabled } = props;
    const [localValue, setValue] = useState<string>(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(id, e.target.value);
    };

    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <QuestionPromptText prompt={prompt} required={required ?? false}/>
            <Typography variant="subtitle2" gutterBottom>
                {additional}
            </Typography>
            <MUITextField
                id={prompt}
                label={label}
                required={required}
                variant={variant}
                value={localValue}
                multiline={multiline}
                onChange={handleChange}
                disabled={disabled}
                fullWidth
            />
        </Box>
    );
};

export default TextField;
