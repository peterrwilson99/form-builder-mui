import { FC, useState, useEffect, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { MultipleTextFieldElement } from "./Components";

export interface MultipleTextFieldProps extends MultipleTextFieldElement {
    onChange: (id: number, values: string[]) => void;
    disabled?: boolean;
}

const MultipleTextField: FC<MultipleTextFieldProps> = ({ id, value, prompt, additional, label, variant, required, onChange, disabled, max, min }) => {
    const defaultValues = () => {
        if (!min) return [""];
        return Array(parseInt(String(min))).fill("");
    };
    // Ensure value is a string array for MultipleTextField component
    const arrayValue = Array.isArray(value) ? value : defaultValues();
    const [values, setValues] = useState<string[]>(arrayValue);

    useEffect(() => {
        const newArrayValue = Array.isArray(value) ? value : defaultValues();
        setValues(newArrayValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, min]);

    const handleAddField = () => {
        setValues([...values, ""]);
        onChange(id, [...values, ""]);
    };

    const handleRemoveField = (index: number) => {
        const newValues = values.filter((value, idx) => idx !== index);
        setValues(newValues);
        onChange(id, newValues);
    };

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
        onChange(id, newValues);
    };

    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <QuestionPromptText prompt={prompt} required={required ?? false} />
            <RenderMarkdown markdown={additional} />
            {values.map((value, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginY: "16px",
                    }}
                    className="d-flex align-items-center my-4"
                >
                    <TextField
                        required={required}
                        value={value}
                        label={label}
                        variant={variant ?? "standard"}
                        onChange={(event) => handleChange(index, event)}
                        fullWidth
                        disabled={disabled}
                    />
                    {index === values.length - 1 && (
                        // strict comparison is not working for some reason
                        <IconButton color="primary" disabled={disabled || (max && values.length >= parseInt(String(max))) || undefined} onClick={handleAddField}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    )}
                    {index > 0 && index === values.length - 1 && (
                        // same as above, strict comparison not working
                        <IconButton
                            color="secondary"
                            disabled={disabled || (min && values.length <= parseInt(String(min))) || undefined}
                            onClick={() => handleRemoveField(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default MultipleTextField;
