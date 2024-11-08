import { FC, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Option } from "./SelectInput";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";

export interface MultipleSelectFieldProps {
    id: string;
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value: string[];
    variant?: "standard" | "filled" | "outlined";
    options: Option[];
    onChange: (id: string, values: string[]) => void;
    disabled?: boolean;
    min?: string;
    max?: string;
}

const MultipleSelectField: FC<MultipleSelectFieldProps> = ({
    id,
    value,
    prompt,
    additional,
    label,
    variant,
    required,
    options,
    onChange,
    disabled,
    max,
    min,
}) => {
    const defaultValues = () => {
        if (!min) return [""];
        return Array(parseInt(min)).fill("");
    };
    const [values, setValues] = useState<string[]>(defaultValues);

    useEffect(() => {
        setValues(value ?? defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, min]);

    const handleAddField = () => {
        setValues([...values, ""]);
    };

    const handleRemoveField = (index: number) => {
        const newValues = values.filter((value, idx) => idx !== index);
        setValues(newValues);
        onChange(id, newValues);
    };

    const handleChange = (index: number, event: SelectChangeEvent<string>) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
        onChange(id, newValues);
    };

    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <QuestionPromptText prompt={prompt} required={required ?? false} />
            <RenderMarkdown markdown={additional} />
            {values.map((localValue, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginY: "16px",
                    }}
                    className="d-flex align-items-center my-4"
                >
                    <FormControl fullWidth required={required}>
                        <InputLabel
                            id={(id as string) + "-" + index + "-label"}
                            sx={{ "& .MuiInputLabel-asterisk": { display: "none" } }} // Hide the asterisk
                        >
                            {label}
                        </InputLabel>
                        <Select
                            labelId={(id as string) + "-" + index + "-label"}
                            id={(id as string) + "-" + index}
                            value={localValue}
                            variant={variant ?? "standard"}
                            onChange={(event) => handleChange(index, event)}
                            label={prompt}
                            disabled={disabled}
                            fullWidth
                            sx={{ wordWrap: "break-word" }}
                        >
                            {(options ?? []).map((option, idx) => (
                                <MenuItem key={idx} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {index === values.length - 1 && (
                        // strict comparison is not working for some reason
                        <IconButton color="primary" disabled={disabled || (max && values.length >= parseInt(max)) || undefined} onClick={handleAddField}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    )}
                    {index > 0 && index === values.length - 1 && (
                        // same as above, strict comparison not working
                        <IconButton
                            color="secondary"
                            disabled={disabled || (min && values.length <= parseInt(min)) || undefined}
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

export default MultipleSelectField;
