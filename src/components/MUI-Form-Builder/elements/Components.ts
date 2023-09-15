import TextField from "./TextField";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import Header from "./Header";
import Checkboxes from "./Checkboxes";
import DateInput from "./DateInput";
import MultipleTextField from "./MultipleTextField";
import NumberInput from "./NumberInput";

export const ComponentDefaults = {
    'TextField': {
        prompt: "prompt text here",
        required: false,
        variant: "standard",
        defaultValue: "",
        multiline: false
    },
    'RadioInput': {
        prompt: "prompt text here",
        required: false,
        defaultValue: "",
        options: [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
            { label: 'Option3', value: 'Option3' },
            { label: 'Option4', value: 'Option4' },
        ]
    },
    'SelectInput': {
        prompt: "prompt text here",
        required: false,
        defaultValue: "",
        options: [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
            { label: 'Option3', value: 'Option3' },
        ]
    },
    'Header': {
        text: "Header text here",
        variant: "h6",
    },
    'Checkboxes': {
        prompt: "prompt text here",
        required: false,
        options: [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
            { label: 'Option3', value: 'Option3' },
        ]
    },
    'DateInput': {
        prompt: "prompt text here",
        required: false,
        format: "datetime-local",
        defaultValue: "",
    },
    'MultipleTextField': {
        prompt: "prompt text here",
        required: false,
    },
    'NumberInput': {
        prompt: "prompt text here",
        required: false,
        variant: "standard",
    },
}

export const Components = {
    'TextField': TextField,
    'RadioInput': RadioInput,
    'SelectInput': SelectInput,
    'Header': Header,
    'Checkboxes': Checkboxes,
    'DateInput': DateInput,
    'MultipleTextField': MultipleTextField,
    'NumberInput': NumberInput,
}

export const ComponentProperties = {
    'TextField': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'string', label: 'Default Value'},
        variant: { type: 'select', label: 'Variant', options: ['standard', 'filled', 'outlined'] },
        multiline: { type: 'boolean', label: 'Multiline?' },
    },
    'RadioInput': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'select', label: 'Default Value'},
        options: { type: 'array', label: 'Options' },
    },
    'SelectInput': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'select', label: 'Default Value'},
        options: { type: 'array', label: 'Options' },
    },
    'Header': {
        text: { type: 'string', label: 'Header Text' },
        variant: { type: 'select', label: 'Variant', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2', 'p'] },
    },
    'Checkboxes': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'string', label: 'Default Value'},
        options: { 
            type: 'array', 
            label: 'Options',
            itemSchema: {
                type: 'object',
                properties: {
                    label: { type: 'string', label: 'Label' },
                    value: { type: 'string', label: 'Value' },
                },
            },
        },
    },
    'DateInput': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'string', label: 'Default Value'},
        format: {
            type: 'select',
            label: 'Format',
            options: [
                { value: 'date', label: 'Date' },
                { value: 'time', label: 'Time' },
                { value: 'datetime-local', label: 'Datetime' },
            ],
        },
    },
    'MultipleTextField': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'string', label: 'Default Value'},
        variant: { type: 'select', label: 'Variant', options: ['standard', 'filled', 'outlined'] },
    },
    'NumberInput': {
        prompt: { type: 'string', label: 'Form prompt Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        defaultValue: { type: 'string', label: 'Default Value'},
        variant: { type: 'string', label: 'Variant', options: ['standard', 'filled', 'outlined'] },
    },

}
