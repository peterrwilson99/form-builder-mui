import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { ComponentProperties } from './elements/Components';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent, IconButton, Grid } from '@mui/material';

interface OptionType {
  label?: string | number;
  value?: string | number;
}

interface PropertiesProps {
  element: { id: number; type: string; [key: string]: any };
  editElement: (id: number, properties: { [key: string]: any }) => void;
}

interface ComponentDetails {
  type: string;
  label: string;
  options?: OptionType[];
}

const SelectComponent = (
    label: string,
    options: OptionType[] | undefined,
    value: any,
    handleChange: (event: SelectChangeEvent) => void
  ) => {
    return (
      <FormControl sx={{marginY: "16px"}} fullWidth>
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          value={value}
          onChange={handleChange}
        >
          {(options ?? []).map((option, index) => {
            return (
                <MenuItem key={index} value={option instanceof Object ? option.value : option}>
                    {option instanceof Object ? option.label : option}
                </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  };

const BooleanComponent = (label: string, value: boolean, handleChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <FormControlLabel
            sx={{marginY: "16px"}} 
            control={
                <Checkbox checked={value} onChange={handleChange} />
            }
            label={label}
        />
    )
};

const StringComponent = (label: string, value: string, handleChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <TextField sx={{marginY: "16px"}} variant="standard" label={label} value={value} onChange={handleChange} fullWidth />
    )
};

const ArrayComponent = (label: string, value: OptionType[] | undefined, handleChange: (event: any) => void): any => {
    const [options, setOptions] = useState(value ?? [''] as OptionType[]);

    const handleOptionChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options];
        newOptions[index] = { label: event.target.value, value: index };  // Ensure this is an OptionType object
        setOptions(newOptions);
        const keyedOptions = newOptions.map((option, index) => ({ value: option.label, label: option.label ?? '' }));
        
        handleChange({ target: keyedOptions });  // Mimic event object structure for consistency
    };
    

    const handleAddOption = () => {
        setOptions([...options, {label: '', value: ''}]);
    };

    const handleDeleteOption = (index: number) => () => { 
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
      const keyedOptions = newOptions.map((option, index) => ({ value: option.label, label: option.label ?? '' }));
      handleChange({ target: keyedOptions });  // Mimic event object structure for consistency
    }

    return (
        <Box>
            <InputLabel>{label}</InputLabel>
            {(options ?? []).map((option, index) => (
              <Box>
                <TextField
                    key={index}
                    sx={{marginY: "16px", width: "90%"}}
                    variant="standard"
                    value={option.label ?? option.value ?? option}
                    onChange={handleOptionChange(index)}
                />
                <IconButton onClick={handleDeleteOption(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddOption} variant="outlined">+ Add Option</Button>
        </Box>
    );
};

const getComponent = (details: ComponentDetails, value: any, handleChange: (event: any) => void) => {
    const { type, label, options } = details;
    switch(type) {
        case 'select':
            return SelectComponent(label, options, value, handleChange);
        case 'boolean':
            return BooleanComponent(label, value, handleChange);
        case 'string':
            return StringComponent(label, value, handleChange);
        case 'array':
            return ArrayComponent(label, value, handleChange);
        default:
            return <></>;
    }
};

const Properties: FC<PropertiesProps> = ({ element, editElement }) => {
  const componentProperties = ComponentProperties[element.type as keyof typeof ComponentProperties];
  const [properties, setProperties] = useState(Object.fromEntries(Object.entries(element).filter(([key, value]) => key !== 'id')));

  const handleChange = (key: string) => (event: ChangeEvent<HTMLInputElement> ) => {
    let val: string | boolean | OptionType[] = event.target.value ?? event.target;
    if (event.target.type === "checkbox") {
        val = event.target.checked; // For checkboxes, use "checked" property instead
    }
    
    console.log("key", key, "val", val)
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
    <Box sx={{ minWidth: '400px', marginY: "16px" }}>
      <Container sx={{margin: "auto"}}>
        <Typography variant="h6" sx={{marginTop: "32px"}} gutterBottom>
          {element.type ?? 'prompt'} Properties
        </Typography>
        <Divider sx={{marginBottom: "8px"}} />
        <form>
          {Object.entries(componentProperties).map(([key, value]) => {
            const component = getComponent(value as ComponentDetails, properties[key], handleChange(key));
            return component;
          })}
        </form>
      </Container>
    </Box>
  );
};

export default Properties;
