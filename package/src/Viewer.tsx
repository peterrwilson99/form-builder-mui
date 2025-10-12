/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Button, Typography, debounce } from "@mui/material";
import { 
    Components, 
    Element, 
    isFormInputElement, 
    isRequiredElement,
    FormInputElementType,
    RequiredElementType,
    ElementByType,
    ComponentKeys
} from "./elements/Components";

export interface ViewerProps {
    form?: Element[];
    onSubmit?: (formValues: any) => void;
    onSubmitPartial?: (formValues: any) => void;
    onAutoSave?: (formValues: any) => void;
    autoSaveInterval?: number;
    preview?: Boolean;
    disabled?: boolean;
    submitText?: string;
    saveText?: string;
}
// Type-safe form values interface
interface FormValues {
    [elementId: string]: string | number | boolean | string[] | number[] | boolean[] | Record<string, boolean> | undefined;
}

const Viewer: FC<ViewerProps> = ({ form, onSubmit, onSubmitPartial, onAutoSave, autoSaveInterval, preview, disabled, submitText, saveText }) => {
    const [formValues, setFormValues] = useState<FormValues>({});
    const [triggerAutosave, setTriggerAutosave] = useState(false);
    const [errorText, setErrorText] = useState<string>("");
    const elements = form ?? ([] as Element[]);
    const formValuesRef = useRef(formValues); // Create a ref for formValues

    // Update the ref whenever formValues changes
    useEffect(() => {
        formValuesRef.current = formValues;
        console.log(formValues);
    }, [formValues]);

    const handleChange = React.useCallback((id: number, value: FormValues[string]) => {
        setErrorText("");
        setFormValues((prevValues) => {
            const updatedValues: FormValues = {
                ...prevValues,
                [id]: value,
            };
            return updatedValues;
        });
        setTriggerAutosave(true);
    }, []);

    const findElementById = (id: number) => {
        return elements.find((element) => element.id === id);
    };

    const autoSave = React.useMemo(() => {
        return debounce(() => handleAutosave(undefined, formValuesRef.current), autoSaveInterval ?? 3000);
    }, [autoSaveInterval]);

    useEffect(() => {
        loadFormValues();
    }, [form]);

    const loadFormValues = () => {
        // loads form values from form into formValues for dependent elements
        if (!form) return;
        const values: FormValues = {};
        form.forEach((element) => {
            if (!isFormInputElement(element)) return;
            // Type-safe access to element.value since we know it's a FormInputElementType
            const inputElement = element as FormInputElementType;
            values[inputElement.id] = inputElement.value;
        });
        setFormValues(values);
    };

    useEffect(() => {
        if (triggerAutosave && !preview && !disabled && onAutoSave) {
            autoSave();
            setTriggerAutosave(false);
        }
    }, [triggerAutosave, autoSave, preview, disabled, onAutoSave]);

    const getCompletedForm = (formValuesProp: FormValues | undefined): Element[] => {
        const completedForm = [...(form ?? [])]; // Create a copy to avoid mutations
        const curFormValues = formValuesProp ?? formValues;
        
        for (const id in curFormValues) {
            const index = completedForm.findIndex((element) => String(element.id) === id);
            if (index !== -1 && isFormInputElement(completedForm[index])) {
                // Type-safe update of element value
                const inputElement = completedForm[index] as FormInputElementType;
                completedForm[index] = {
                    ...inputElement,
                    value: curFormValues[id] as FormInputElementType['value'],
                };
            }
        }
        return completedForm;
    };

    const isComplete = (completedForm: Element[]): boolean => {
        const requiredElements = completedForm.filter((element) => isRequiredElement(element)) as RequiredElementType[];
        
        for (const element of requiredElements) {
            if (!isFormInputElement(element)) continue;
            
            const inputElement = element as FormInputElementType;
            // Handle special cases where falsy values are valid (false, 0)
            if (inputElement.value === false || inputElement.value === 0) continue;
            
            // Check if the value is empty/null/undefined
            if (!inputElement.value) {
                return false;
            }
        }
        return true;
    };

    const isDependentElement = (element: Element): boolean => {
        if (!element.dependentProperties?.enabled) return false;
        const parentElement = findElementById(element.dependentProperties.parentId);
        return parentElement !== undefined;
    };

    const isDependentElementEqual = (element: Element): boolean => {
        if (!element.dependentProperties?.enabled) return false;
        const parentId = element.dependentProperties.parentId;
        const expectedValue = element.dependentProperties.parentValue;
        const actualValue = formValues[parentId];
        
        // Handle array comparison for multiple select fields
        if (Array.isArray(expectedValue) && Array.isArray(actualValue)) {
            return expectedValue.every((val: any) => (actualValue as any[]).includes(val));
        }
        
        return actualValue === expectedValue;
    };

    const shouldHideElement = (element: Element): boolean => {
        return isDependentElement(element) && !isDependentElementEqual(element);
    };

    const handleSubmit = (e: FormEvent | undefined) => {
        if (e) e.preventDefault();
        setErrorText("");
        const completedForm = getCompletedForm(undefined);
        if (onSubmit && isComplete(completedForm)) {
            onSubmit(completedForm);
        } else {
            setErrorText("Please complete missing required fields");
        }
    };
    const handleSave = (e: FormEvent | undefined, formValuesProp?: FormValues | undefined) => {
        if (e) e.preventDefault();
        const completedForm = getCompletedForm(formValuesProp);
        if (onSubmitPartial) {
            onSubmitPartial(completedForm);
        }
    };
    const handleAutosave = (e: FormEvent | undefined, formValuesProp?: FormValues | undefined) => {
        if (e) e.preventDefault();
        const completedForm = getCompletedForm(formValuesProp);
        if (onAutoSave) {
            onAutoSave(completedForm);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {elements.map((element, index) => {
                // Type-safe component access
                const Component = Components[element.type as ComponentKeys] as FC<any>;
                
                // check for conditional display
                if (shouldHideElement(element)) {
                    return <React.Fragment key={index} />;
                }
                
                return (
                    <Component 
                        key={element.id} 
                        onChange={handleChange} 
                        disabled={disabled} 
                        {...element} 
                    />
                );
            })}

            {!preview && !disabled ? (
                <React.Fragment>
                    <Button type="submit" variant="outlined" sx={{ marginBottom: "1rem" }}>
                        {submitText ?? "Submit"}
                    </Button>
                    {onSubmitPartial ? (
                        <Button variant="outlined" onClick={handleSave} sx={{ marginLeft: "1rem", marginBottom: "1rem" }} color="secondary">
                            {saveText ?? "Save"}
                        </Button>
                    ) : (
                        <></>
                    )}
                </React.Fragment>
            ) : (
                <></>
            )}
            <Typography variant="body1" color="error" gutterBottom>
                {errorText}
            </Typography>
        </form>
    );
};

export default Viewer;
