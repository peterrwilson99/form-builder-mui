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
        question: "Question text here",
        required: false,
        variant: "standard",
        valueProp: "",
        multiline: false
    },
    'RadioInput': {
        question: "Question text here",
        required: false,
        valueProp: "",
        options: [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
            { label: 'Option3', value: 'Option3' },
            { label: 'Option4', value: 'Option4' },
        ]
    },
    'SelectInput': {
        question: "Question text here",
        required: false,
        valueProp: "",
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
        question: "Question text here",
        required: false,
        options: [
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
            { label: 'Option3', value: 'Option3' },
        ]
    },
    'DateInput': {
        question: "Question text here",
        required: false,
        format: "datetime-local",
        valueProp: "",
    },
    'MultipleTextField': {
        question: "Question text here",
        required: false,
    },
    'NumberInput': {
        question: "Question text here",
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
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
        variant: { type: 'select', label: 'Variant', options: ['standard', 'filled', 'outlined'] },
        multiline: { type: 'boolean', label: 'Multiline?' },
    },
    'RadioInput': {
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
        options: { type: 'array', label: 'Options' },
    },
    'SelectInput': {
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
        options: { type: 'array', label: 'Options' },
    },
    'Header': {
        text: { type: 'string', label: 'Header Text' },
        variant: { type: 'select', label: 'Variant', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2', 'p'] },
    },
    'Checkboxes': {
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
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
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
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
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
        variant: { type: 'select', label: 'Variant', options: ['standard', 'filled', 'outlined'] },
    },
    'NumberInput': {
        question: { type: 'string', label: 'Form Question Text'},
        required: { type: 'boolean', label: 'Required Field?' },
        valueProp: { type: 'string', label: 'Default Value'},
        variant: { type: 'string', label: 'Variant', options: ['standard', 'filled', 'outlined'] },
    },

}
