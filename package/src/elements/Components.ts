import TextField from "./TextField";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import Header from "./Header";
import Checkboxes from "./Checkboxes";
import DateInput from "./DateInput";
import MultipleTextField from "./MultipleTextField";
import NumberInput from "./NumberInput";
import Divider from "./Divider";
import MultipleSelectField from "./MultipleSelectField";
import Markdown from "./Markdown";

export type { TextFieldProps } from "./TextField";
export type { RadioInputProps } from "./RadioInput";
export type { SelectInputProps } from "./SelectInput";
export type { HeaderProps } from "./Header";
export type { CheckboxesProps } from "./Checkboxes";
export type { DateInputProps } from "./DateInput";
export type { MultipleTextFieldProps } from "./MultipleTextField";
export type { NumberInputProps } from "./NumberInput";

export type DependentProps = {
    enabled: boolean;
    parentId: number;
    parentValue: any;
};

export interface Element {
    id: number;
    type: keyof typeof Components;
    [key: string]: any; // This can be improved by defining more explicit types
    dependentProperties?: DependentProps;
}

export const ComponentDefaults = {
    TextField: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        variant: "standard",
        value: "",
        multiline: false,
    },
    RadioInput: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        variant: "standard",
        value: "",
        options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
        ],
    },
    SelectInput: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        value: "",
        options: [
            { label: "Option1", value: "Option1" },
            { label: "Option2", value: "Option2" },
            { label: "Option3", value: "Option3" },
        ],
    },
    Header: {
        text: "Header text here",
        variant: "h6",
        bold: false,
        italic: false,
    },
    Divider: {
        variant: "fullWidth",
        text: "",
        textAlign: "center",
    },
    Checkboxes: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        options: [
            { label: "Option1", value: "Option1" },
            { label: "Option2", value: "Option2" },
            { label: "Option3", value: "Option3" },
        ],
    },
    DateInput: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        format: "datetime-local",
        value: "",
    },
    MultipleTextField: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
    },
    MultipleSelectField: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        variant: "standard",
        value: [""],
        options: [
            { label: "Option1", value: "Option1" },
            { label: "Option2", value: "Option2" },
            { label: "Option3", value: "Option3" },
        ],
    },
    NumberInput: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        variant: "standard",
    },
    Markdown: {
        text: "**Markdown** text here",
    },
};

export const Components = {
    TextField: TextField,
    RadioInput: RadioInput,
    SelectInput: SelectInput,
    Header: Header,
    Divider: Divider,
    Checkboxes: Checkboxes,
    DateInput: DateInput,
    MultipleTextField: MultipleTextField,
    NumberInput: NumberInput,
    MultipleSelectField: MultipleSelectField,
    Markdown: Markdown,
};

export const DependableComponents = {
    TextField: TextField,
    RadioInput: RadioInput,
    SelectInput: SelectInput,
    Checkboxes: Checkboxes,
    DateInput: DateInput,
    NumberInput: NumberInput,
};

// method to get type of component based on type
export const getComponentType = (type: string) => {
    return Components[type as ComponentKeys];
};

// make type of keys in components
export type ComponentKeys = keyof typeof Components;

export const ComponentProperties = {
    TextField: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        variant: {
            type: "select",
            label: "Variant",
            options: ["standard", "filled", "outlined"],
        },
        multiline: { type: "boolean", label: "Multiline?" },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    RadioInput: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        options: { type: "array", label: "Options" },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    SelectInput: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        options: { type: "array", label: "Options" },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    Header: {
        text: { type: "string", label: "Header Text" },
        variant: {
            type: "select",
            label: "Variant",
            options: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "subtitle1", "subtitle2", "p"],
        },
        bold: { type: "boolean", label: "Bold" },
        italic: { type: "boolean", label: "Italic" },
        divider: { type: "boolean", label: "Divider" },
        border: { type: "boolean", label: "Bottom Border" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    Divider: {
        variant: {
            type: "select",
            label: "Variant",
            options: ["fullWidth", "inset", "middle"],
        },
        text: { type: "string", label: "Divider Text" },
        textAlign: {
            type: "select",
            label: "Text Align",
            options: ["left", "center", "right"],
        },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    Checkboxes: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        options: {
            type: "array",
            label: "Options",
            itemSchema: {
                type: "object",
                properties: {
                    label: { type: "string", label: "Label" },
                    value: { type: "string", label: "Value" },
                },
            },
        },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    DateInput: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        format: {
            type: "select",
            label: "Format",
            options: [
                { value: "date", label: "Date" },
                { value: "time", label: "Time" },
                { value: "datetime-local", label: "Datetime" },
            ],
        },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    MultipleTextField: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        variant: {
            type: "select",
            label: "Variant",
            options: ["standard", "filled", "outlined"],
        },
        min: { type: "number", label: "Minimum Amount of Lines" },
        max: { type: "number", label: "Maximum Amount of Lines" },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    MultipleSelectField: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        options: { type: "array", label: "Options" },
        required: { type: "boolean", label: "Required Field?" },
        variant: {
            type: "select",
            label: "Variant",
            options: ["standard", "filled", "outlined"],
        },
        min: { type: "number", label: "Minimum Amount of Lines" },
        max: { type: "number", label: "Maximum Amount of Lines" },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    NumberInput: {
        prompt: { type: "string", label: "Question Prompt" },
        additional: { type: "string", label: "Additional Text" },
        label: { type: "string", label: "Label Text" },
        required: { type: "boolean", label: "Required Field?" },
        variant: {
            type: "select",
            label: "Variant",
            options: ["standard", "filled", "outlined"],
        },
        value: { type: "default", label: "Default Value" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
    Markdown: {
        text: { type: "string", label: "Markdown Text" },
        dependentProperties: { type: "dependent", label: "Dependent Properties" },
    },
};
