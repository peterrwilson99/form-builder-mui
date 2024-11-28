/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Button, Typography, debounce } from "@mui/material";
import { Components, Element } from "./elements/Components";

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
interface FormValues {
    [key: string]: any;
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
    }, [formValues]);

    const handleChange = (id: string, value: any) => {
        setErrorText("");
        setFormValues((prevValues) => {
            const updatedValues = {
                ...prevValues,
                [id]: value,
            };
            return updatedValues;
        });
        setTriggerAutosave(true);
    };

    const findElementById = (id: number) => {
        return elements.find((element) => element.id === id);
    };

    const autoSave = React.useMemo(() => {
        return debounce(() => handleAutosave(undefined, formValuesRef.current), autoSaveInterval ?? 3000);
    }, []);

    React.useEffect(() => {
        if (triggerAutosave && !preview && !disabled && onAutoSave) {
            autoSave();
            setTriggerAutosave(false);
        }
    }, [triggerAutosave, autoSave, handleChange]);

    const getCompletedForm = (formValuesProp: FormValues | undefined) => {
        const completedForm = form ?? [];
        const curFormValues = formValuesProp ?? formValues;
        for (const id in curFormValues) {
            const index = completedForm.findIndex((element) => String(element.id) === id);
            completedForm[index].value = curFormValues[id];
        }
        return completedForm;
    };

    const isComplete = (completedForm: Element[]) => {
        const requiredElements = completedForm.filter((element) => element.required);
        for (const element of requiredElements) {
            if (element.value === false || element.value === 0) continue;

            if (!element.value) {
                return false;
            }
        }
        return true;
    };

    const isDependentElement = (element: Element): boolean => {
        if (!element.dependentProperties) return false;
        return element.dependentProperties?.enabled && findElementById(element.dependentProperties?.parentId) !== undefined;
    };
    const isDependentElementEqual = (element: Element): boolean => {
        if (!element.dependentProperties) return false;
        return formValues[element.dependentProperties.parentId] === element.dependentProperties.parentValue;
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
                const Component = Components[element.type] as FC<any>;
                // check for conditional display
                if (shouldHideElement(element)) {
                    return <></>;
                }
                return <Component key={index} onChange={handleChange} disabled={disabled} {...element} />;
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
