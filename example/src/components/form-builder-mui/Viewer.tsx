/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, debounce } from "@mui/material";
import { Components } from "./elements/Components";

export interface Element {
  id: number;
  type: keyof typeof Components;
  [key: string]: any;
}

export interface ViewerProps {
  form?: Element[];
  onSubmit?: (formValues: any) => void;
  onSubmitPartial?: (formValues: any) => void;
  preview?: Boolean;
  disabled?: boolean;
  submitText?: string;
  saveText?: string;
}
interface FormValues {
  [key: string]: any;
}

const Viewer: FC<ViewerProps> = ({ form, onSubmit, onSubmitPartial, preview, disabled, submitText, saveText }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [triggerAutosave, setTriggerAutosave] = useState(false);
  const elements = form ?? [] as Element[];
  const formValuesRef = useRef(formValues); // Create a ref for formValues

    // Update the ref whenever formValues changes
    useEffect(() => {
      formValuesRef.current = formValues;
    }, [formValues]);

    const handleChange = (id: string, value: any) => {
      setFormValues((prevValues) => {
        const updatedValues = {
          ...prevValues,
          [id]: value,
        };
        return updatedValues;
      });
      setTriggerAutosave(true);
    };

  const autoSave = React.useMemo(() => {
    return debounce(() => handleSave(undefined, formValuesRef.current), 3000);
  }, []);

  React.useEffect(() => {
    if(triggerAutosave && !preview && !disabled && onSubmitPartial){
      autoSave();
      setTriggerAutosave(false);
    }
  }, [triggerAutosave, autoSave, handleChange]);

  const getCompletedForm = (formValuesProp: FormValues | undefined) => {
    const completedForm = form ?? [];
    const curFormValues = formValuesProp ?? formValues;
    for(const id in curFormValues){
      const index = completedForm.findIndex((element) => String(element.id) === id );
      completedForm[index].value = curFormValues[id];
    }
    return completedForm;
  }

  const handleSubmit = (e: FormEvent | undefined) => {
    if(e) e.preventDefault();
    const completedForm = getCompletedForm(undefined);
    if (onSubmit) {
      onSubmit(completedForm);
    }
  };
  const handleSave = (e: FormEvent | undefined, formValuesProp?: FormValues | undefined) => {
    if(e) e.preventDefault();
    const completedForm = getCompletedForm(formValuesProp);
    if (onSubmitPartial) {
      onSubmitPartial(completedForm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {elements.map((element, index) => {
        const Component = Components[element.type] as FC<any>;
        return <Component key={index} onChange={handleChange} disabled={disabled} {...element}/>;
      })}
      {!preview && !disabled ? 
        <React.Fragment>
          <Button type="submit" variant="outlined" sx={{marginBottom: '1rem'}} >
            {submitText ?? 'Submit'}
          </Button>
          {onSubmitPartial ?
            <Button variant="outlined" onClick={handleSave} sx={{marginLeft: '1rem', marginBottom: '1rem'}} color="secondary" >
              {saveText ?? 'Save'}
            </Button>
            :
            <></>
          }
        </React.Fragment>
        :
        <></>
      }
    </form>
  );
};

export default Viewer;
