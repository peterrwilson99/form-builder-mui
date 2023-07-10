import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { ComponentProperties } from './elements/Components';
import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent } from '@mui/material';

interface OptionType {
  label?: string;
  value?: string | number;
}

interface PropertiesProps {
  element: { id: string; type: string; [key: string]: any };
  editElement: (id: string, properties: { [key: string]: any }) => void;
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
      <FormControl className="my-4" fullWidth>
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
            className="my-4" 
            control={
                <Checkbox checked={value} onChange={handleChange} />
            }
            label={label}
        />
    )
};

const StringComponent = (label: string, value: string, handleChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <TextField className="my-4" variant="standard" label={label} value={value} onChange={handleChange} fullWidth />
    )
};

const ArrayComponent = (label: string, value: OptionType[] | undefined, handleChange: (event: any) => void) => {
    const [options, setOptions] = useState(value ?? [''] as OptionType[]);

    const handleOptionChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options];
        newOptions[index] = { label: event.target.value, value: index };  // Ensure this is an OptionType object
        setOptions(newOptions);
        const keyedOptions = newOptions.map((option, index) => ({ value: index, label: option.label ?? '' }));
        console.log("keyedOptions", keyedOptions)
        handleChange({ target: keyedOptions });  // Mimic event object structure for consistency
    };
    

    const handleAddOption = () => {
        setOptions([...options, {label: '', value: options.length}]);
    };

    return (
        <div>
            <InputLabel>{label}</InputLabel>
            {(options ?? []).map((option, index) => (
                <TextField
                    key={index}
                    className="my-4"
                    variant="standard"
                    value={option.label ?? option.value ?? option}
                    onChange={handleOptionChange(index)}
                    fullWidth
                />
            ))}
            <Button onClick={handleAddOption} variant="outlined">+ Add Option</Button>
        </div>
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
  const componentProperties = ComponentProperties[element.type] as any;
  const [properties, setProperties] = useState(Object.fromEntries(Object.entries(element).filter(([key, value]) => key !== 'id')));

  const handleChange = (key: string) => (event: SelectChangeEvent | ChangeEvent<HTMLInputElement>) => {
    let val;
    if ('target' in event) {
      // It's a React.ChangeEvent
      val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    } else {
      // It's a SelectChangeEvent
      val = event.target.value;
    }
    setProperties({
      ...properties,
      [key]: val,
    });
  };

  useEffect(() => {
    if (element.id !== undefined) {
      editElement(element.id, properties);
    }
  }, [properties]);

  return (
    <Box sx={{ minWidth: '400px' }} className="my-4">
      <Container className="m-auto">
        <Typography variant="h6" className="mt-8" gutterBottom>
          {element.type ?? 'Question'} Properties
        </Typography>
        <Divider className="mb-2" />
        <form>
          {Object.entries(componentProperties).map(([key, value]) => {
            const component = getComponent(value, properties[key], handleChange(key));
            return component;
          })}
        </form>
      </Container>
    </Box>
  );
};

export default Properties;
