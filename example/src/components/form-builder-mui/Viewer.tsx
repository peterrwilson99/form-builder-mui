/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, FormEvent, useCallback, useEffect, useState } from "react";
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

  const handleChange = (id: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    setTriggerAutosave(true);
  };

  React.useEffect(() => {
    if(triggerAutosave && !preview && !disabled && onSubmitPartial){
      autoSave(formValues);
      setTriggerAutosave(false);
    }
  }, [triggerAutosave]);

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

  const autoSave = React.useMemo(() => {
    return debounce((formValuesProp) => handleSave(undefined, formValuesProp), 2000);
  }, []);

  
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
