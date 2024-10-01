/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { ComponentKeys, ComponentProperties, Components } from "./elements/Components";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    SelectChangeEvent,
    IconButton,
} from "@mui/material";

export interface OptionType {
    label?: string | number;
    value?: string | number;
}

export interface PropertiesProps {
    element: { id: number; type: string; [key: string]: any };
    editElement: (id: number, properties: { [key: string]: any }) => void;
    allElements: { id: number; type: string; [key: string]: any }[];
}

export interface ComponentDetails {
    type: string;
    label: string;
    options?: OptionType[];
}

const SelectComponent = (label: string, options: OptionType[] | undefined, value: any, handleChange: (event: SelectChangeEvent) => void) => {
    return (
        <FormControl sx={{ marginY: "16px" }} fullWidth>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select labelId={`${label}-label`} value={value} variant="standard" onChange={handleChange}>
                {(options ?? []).map((option, index) => {
                    return (
                        <MenuItem key={index} value={option instanceof Object ? option.value : option}>
                            {option instanceof Object ? option.label : option}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

const DependentDisplayProperties = (
    currentElement: { id: number; type: string; [key: string]: any },
    allElements: { id: number; type: string; [key: string]: any }[],
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
) => {
    const [enableDependentDisplay, setEnableDependentDisplay] = useState(currentElement.dependentProperties?.isDependentDisplay ?? false);
    const [dependentDisplayId, setDependentDisplayId] = useState(currentElement.dependentProperties?.dependsOnId ?? -1);
    const [dependentDisplayValue, setDependentDisplayValue] = useState<any>(currentElement.dependentProperties?.dependsOnValue ?? undefined);
    console.log("Dependent Display Properties", currentElement);
    const updateFormProperties = () => {
        const dependentProperties = {
            isDependentDisplay: enableDependentDisplay,
            dependsOnId: dependentDisplayId,
            dependsOnValue: dependentDisplayValue,
        };
        if (dependentDisplayId === -1) {
            return;
        }
        handleChange(onChangeConverter(String(currentElement.id), dependentProperties));
    };

    useEffect(() => {
        updateFormProperties();
    }, [enableDependentDisplay, dependentDisplayId, dependentDisplayValue]);

    return (
        <Box>
            <Typography variant="h6">Display based on other value</Typography>
            <FormControlLabel
                sx={{ marginY: "16px" }}
                control={<Checkbox checked={enableDependentDisplay} onChange={(e) => setEnableDependentDisplay(e.target.checked)} />}
                label="Enable Dependent Display"
            />
            {enableDependentDisplay ? (
                <FormControl sx={{ marginY: "16px" }} fullWidth>
                    <InputLabel id={`dependent-${currentElement.id}-label`}>Display based on response from question</InputLabel>
                    <Select
                        labelId={`dependent-${currentElement.id}-label`}
                        value={dependentDisplayId}
                        variant="standard"
                        onChange={(e) => setDependentDisplayId(e.target.value)}
                    >
                        {allElements.map((formElement, index) => {
                            return (
                                <MenuItem key={index} value={formElement.id}>
                                    {formElement.prompt ?? formElement.text}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            ) : (
                <></>
            )}
            {dependentDisplayId !== -1 ? (
                <Box>
                    <Typography variant="h6">Display When Value Contains</Typography>
                    {getDependentValueComponent(dependentDisplayId, allElements, (id: string, value: any) => setDependentDisplayValue(value))}
                </Box>
            ) : (
                <></>
            )}
        </Box>
    );
};

const getDependentValueComponent = (
    elementId: number,
    allElements: { id: number; type: string; [key: string]: any }[],
    onChange: (id: string, value: any) => void
) => {
    const element = allElements.find((element) => element.id === elementId);
    if (element === undefined) return <></>;
    const Component = Components[element.type as ComponentKeys] as FC<any>;
    return <Component onChange={onChange} inPropertyPanel={true} {...element} />;
};

const BooleanComponent = (label: string, value: boolean, handleChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return <FormControlLabel sx={{ marginY: "16px" }} control={<Checkbox checked={value} onChange={handleChange} />} label={label} />;
};

const StringComponent = (label: string, value: string, handleChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <Box sx={{ display: "flex", maxWidth: "400px", width: "100%" }}>
            <TextField sx={{ flex: 1, marginY: "16px" }} variant="standard" label={label} value={value} onChange={handleChange} multiline />
        </Box>
    );
};

const NumberComponent = (
    label: string,
    value: number,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    min: number | undefined,
    max: number | undefined
) => {
    // ForcingNumberValidation: forcing min and max validation, could be cleaned up in the future
    min = min !== undefined && min < 1 ? 1 : min;
    max = max !== undefined && max < 1 ? 1 : max;
    const minParsed = label.toLowerCase().includes("min") ? 1 : min;
    const maxParsed = label.toLowerCase().includes("max") ? undefined : max;

    return (
        <Box sx={{ display: "flex", maxWidth: "400px", width: "100%" }}>
            <TextField
                sx={{ flex: 1, marginY: "16px" }}
                variant="standard"
                type="number"
                label={label}
                value={value}
                onChange={handleChange}
                InputProps={{ inputProps: { min: minParsed ?? 1, max: maxParsed } }}
            />
        </Box>
    );
};

const ArrayComponent = (label: string, value: OptionType[] | undefined, handleChange: (event: any) => void): any => {
    const [options, setOptions] = useState(value ?? ([""] as OptionType[]));

    const handleOptionChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options];
        newOptions[index] = { label: event.target.value, value: index }; // Ensure this is an OptionType object
        setOptions(newOptions);
        const keyedOptions = newOptions.map((option, index) => ({ value: option.label, label: option.label ?? "" }));

        handleChange({ target: keyedOptions }); // Mimic event object structure for consistency
    };

    const handleAddOption = () => {
        setOptions([...options, { label: "", value: "" }]);
    };

    const handleDeleteOption = (index: number) => () => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
        const keyedOptions = newOptions.map((option, index) => ({ value: option.label, label: option.label ?? "" }));
        handleChange({ target: keyedOptions }); // Mimic event object structure for consistency
    };

    return (
        <Box>
            <InputLabel>{label}</InputLabel>
            {(options ?? []).map((option, index) => (
                <Box sx={{ display: "flex", maxWidth: "400px", width: "100%" }}>
                    <TextField
                        key={index}
                        sx={{ flex: 1, marginY: "16px", overflowWrap: "break-word" }}
                        multiline
                        variant="standard"
                        value={option.label ?? option.value ?? option}
                        onChange={handleOptionChange(index)}
                    />
                    <IconButton onClick={handleDeleteOption(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={handleAddOption} variant="outlined">
                + Add Option
            </Button>
        </Box>
    );
};

const onChangeConverter = (id: string, value: any) => {
    return { target: { id, value } } as ChangeEvent<HTMLInputElement>;
};

const DefaultComponent = (label: string, componentProps: any, handleChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    const componentType: ComponentKeys = componentProps.type ?? "TextField";
    const Component = Components[componentType] as FC<any>;
    return (
        <Box>
            <Divider sx={{ marginY: "16px" }} />
            <Typography variant="h5">Set Default Value</Typography>
            <Component
                onChange={(id: string, value: any) => {
                    handleChange(onChangeConverter(id, value));
                }}
                inPropertyPanel={true}
                {...componentProps}
            />
        </Box>
    );
};

const getComponent = (
    details: ComponentDetails,
    value: any,
    handleChange: (event: any) => void,
    min: number | undefined,
    max: number | undefined,
    allElements: { id: number; type: string; [key: string]: any }[],
    currentElement: { id: number; type: string; [key: string]: any }
) => {
    const { type, label, options } = details;
    switch (type) {
        case "select":
            return SelectComponent(label, options, value, handleChange);
        case "boolean":
            return BooleanComponent(label, value, handleChange);
        case "string":
            return StringComponent(label, value, handleChange);
        case "array":
            return ArrayComponent(label, value, handleChange);
        case "number":
            return NumberComponent(label, value, handleChange, min, max);
        case "default":
            return DefaultComponent(label, value, handleChange);
        case "dependent":
            return DependentDisplayProperties(currentElement, allElements, handleChange);
        default:
            return <></>;
    }
};

const Properties: FC<PropertiesProps> = ({ element, editElement, allElements }) => {
    const componentProperties = ComponentProperties[element.type as keyof typeof ComponentProperties];
    const [properties, setProperties] = useState(Object.fromEntries(Object.entries(element).filter(([key, value]) => key !== "id")));

    const handleChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
        let val: string | boolean | OptionType[] = event.target.value ?? event.target;
        if (event.target.type === "checkbox") {
            val = event.target.checked; // For checkboxes, use "checked" property instead
        }

        // ForcingNumberValidation: want to check if the minimum value is less than max, set it to max and vice versa
        switch (key) {
            case "min":
                val = properties.max !== undefined && val > properties.max ? properties.max : val;
                break;
            case "max":
                val = properties.min !== undefined && val < properties.min ? properties.min : val;
                break;
            default:
                break;
        }

        console.log(key, val);

        setProperties({
            ...properties,
            [key]: val,
        });
    };

    useEffect(() => {
        if (element.id !== undefined) {
            editElement(element.id, properties);
        }
    }, [editElement, element.id, properties]);

    return (
        <Box sx={{ minWidth: { xs: "100vw", sm: "400px" }, maxWidth: "400px", marginY: "16px" }}>
            <Container sx={{ margin: "auto" }}>
                <Typography variant="h6" sx={{ marginTop: "32px" }} gutterBottom>
                    {element.type ?? "prompt"} Properties
                </Typography>
                <Divider sx={{ marginBottom: "8px" }} />
                <form>
                    {Object.entries(componentProperties).map(([key, value]) => {
                        const component_props = value.type === "default" ? properties : properties[key];
                        const max: number | undefined = properties.max ?? undefined;
                        const min: number | undefined = properties.min ?? undefined;
                        const component = getComponent(value as ComponentDetails, component_props, handleChange(key), min, max, allElements, element);
                        return <React.Fragment key={key}>{component}</React.Fragment>;
                    })}
                </form>
            </Container>
        </Box>
    );
};

export default Properties;
