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

// Import OptionType from Properties.tsx
export interface OptionType {
    label?: string | number;
    value?: string | number;
}

export type { TextFieldProps } from "./TextField";
export type { RadioInputProps } from "./RadioInput";
export type { SelectInputProps } from "./SelectInput";
export type { HeaderProps } from "./Header";
export type { CheckboxesProps } from "./Checkboxes";
export type { DateInputProps } from "./DateInput";
export type { MultipleTextFieldProps } from "./MultipleTextField";
export type { NumberInputProps } from "./NumberInput";

// Improved DependentProps with better typing
export interface DependentProps {
    enabled: boolean;
    parentId: number;
    parentValue: string | number | boolean | string[] | number[] | boolean[] | undefined;
}

// Base element interface with common properties
export interface BaseElement {
    id: number;
    type: ComponentKeys;
    dependentProperties?: DependentProps;
}

// Common properties for form input elements
export interface FormInputElement extends BaseElement {
    prompt: string;
    additional?: string;
    label?: string;
    required?: boolean;
    value: string | number | boolean | string[] | number[] | boolean[] | undefined;
}

// Properties for elements with options (radio, select, checkboxes)
export interface OptionsElement extends FormInputElement {
    options: OptionType[];
}

// Properties for elements with variants
export interface VariantElement extends FormInputElement {
    variant: "standard" | "filled" | "outlined";
}

// Properties for elements with min/max constraints
export interface ConstrainedElement extends FormInputElement {
    min?: number;
    max?: number;
}

// Specific element types based on component types
export interface TextFieldElement extends VariantElement {
    type: "TextField";
    multiline?: boolean;
}

export interface RadioInputElement extends OptionsElement {
    type: "RadioInput";
}

export interface SelectInputElement extends OptionsElement {
    type: "SelectInput";
    variant?: "standard" | "filled" | "outlined";
}

export interface CheckboxesElement extends OptionsElement {
    type: "Checkboxes";
}

export interface DateInputElement extends FormInputElement {
    type: "DateInput";
    format: "date" | "time" | "datetime-local";
}

export interface MultipleTextFieldElement extends VariantElement {
    type: "MultipleTextField";
    min?: number;
    max?: number;
}

export interface MultipleSelectFieldElement extends OptionsElement {
    type: "MultipleSelectField";
    variant: "standard" | "filled" | "outlined";
    min?: number;
    max?: number;
}

export interface NumberInputElement extends VariantElement {
    type: "NumberInput";
}

export interface HeaderElement extends BaseElement {
    type: "Header";
    text: string;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "subtitle1" | "subtitle2" | "p";
    bold?: boolean;
    italic?: boolean;
    divider?: boolean;
    border?: boolean;
}

export interface DividerElement extends BaseElement {
    type: "Divider";
    variant?: "fullWidth" | "inset" | "middle";
    text?: string;
    textAlign?: "left" | "center" | "right";
}

export interface MarkdownElement extends BaseElement {
    type: "Markdown";
    text: string;
}

// Union type for all possible element types
export type Element = 
    | TextFieldElement
    | RadioInputElement
    | SelectInputElement
    | CheckboxesElement
    | DateInputElement
    | MultipleTextFieldElement
    | MultipleSelectFieldElement
    | NumberInputElement
    | HeaderElement
    | DividerElement
    | MarkdownElement;

// Utility types for working with elements
export type ElementByType<T extends ComponentKeys> = Extract<Element, { type: T }>;

// Type for form input elements (elements that can have values)
export type FormInputElementType = Extract<Element, { value: any }>;

// Type for elements that can be required
export type RequiredElementType = Extract<Element, { required?: boolean }>;

// Type for elements with options
export type OptionsElementType = Extract<Element, { options: OptionType[] }>;

// Type for elements that can have variants
export type VariantElementType = Extract<Element, { variant: any }>;

// Type guard functions
export const isFormInputElement = (element: Element): element is FormInputElementType => {
    return 'value' in element;
};

export const isRequiredElement = (element: Element): element is RequiredElementType => {
    return 'required' in element;
};

export const isOptionsElement = (element: Element): element is OptionsElementType => {
    return 'options' in element;
};

export const isVariantElement = (element: Element): element is VariantElementType => {
    return 'variant' in element;
};

export const ComponentDefaults = {
    TextField: {
        prompt: "Question text here",
        additional: "Additional question text here",
        required: false,
        variant: "outlined",
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
        variant: "standard",
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
        variant: "outlined",
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
        variant: "outlined",
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

// make type of keys in components
export type ComponentKeys = keyof typeof Components;


// Properties for the component properties config
export interface BaseComponentProperty {
    type: "string" | "boolean" | "select" | "array" | "number" | "default" | "dependent";
    label: string;
}

export interface StringComponentProperty extends BaseComponentProperty {
    type: "string";
}

export interface BooleanComponentProperty extends BaseComponentProperty {
    type: "boolean";
}

export interface NumberComponentProperty extends BaseComponentProperty {
    type: "number";
}

export interface SelectComponentProperty extends BaseComponentProperty {
    type: "select";
    options: string[] | OptionType[];
}

export interface ArrayComponentProperty extends BaseComponentProperty {
    type: "array";
    itemSchema?: {
        type: "object";
        properties: Record<string, BaseComponentProperty>;
    };
}

export interface DefaultComponentProperty extends BaseComponentProperty {
    type: "default";
}

export interface DependentComponentProperty extends BaseComponentProperty {
    type: "dependent";
}

export type ComponentProperty = 
    | StringComponentProperty
    | BooleanComponentProperty
    | NumberComponentProperty
    | SelectComponentProperty
    | ArrayComponentProperty
    | DefaultComponentProperty
    | DependentComponentProperty;

export type ComponentPropertiesConfig = Record<string, ComponentProperty>;




export const ComponentProperties: Record<ComponentKeys, ComponentPropertiesConfig> = {
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
        variant: {
            type: "select",
            label: "Variant",
            options: ["standard", "filled", "outlined"],
        },
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
