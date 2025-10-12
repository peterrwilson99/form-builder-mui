import { FC, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import QuestionPromptText from "../helperComponents/QuestionPromptText";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { MultipleSelectFieldElement } from "./Components";

export interface MultipleSelectFieldProps extends MultipleSelectFieldElement {
    onChange: (id: number, values: string[]) => void;
    disabled?: boolean;
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
        return Array(parseInt(String(min))).fill("");
    };
    // Ensure value is a string array for MultipleSelectField component
    const arrayValue = Array.isArray(value) ? value : defaultValues();
    const [values, setValues] = useState<string[]>(arrayValue);

    useEffect(() => {
        const newArrayValue = Array.isArray(value) ? value : defaultValues();
        setValues(newArrayValue);
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
                            id={id + "-" + index + "-label"}
                            sx={{ "& .MuiInputLabel-asterisk": { display: "none" } }} // Hide the asterisk
                        >
                            {label}
                        </InputLabel>
                        <Select
                            labelId={id + "-" + index + "-label"}
                            id={id + "-" + index}
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

export default MultipleSelectField;
