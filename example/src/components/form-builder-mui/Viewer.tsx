import React, { FC, FormEvent, useState } from "react";
import { Button } from "@mui/material";
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
}

const Viewer: FC<ViewerProps> = ({ form, onSubmit, onSubmitPartial, preview, disabled }) => {
  const [formValues, setFormValues] = useState([]);
  const elements = form ?? [];
  const handleChange = (id: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const getCompletedForm = () => {
    const completedForm = form ?? [];
    for(const id in formValues){
      const index = completedForm.findIndex((element) => String(element.id) === id );
      completedForm[index].value = formValues[id];
    }
    return completedForm;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const completedForm = getCompletedForm();
    if (onSubmit) {
      onSubmit(completedForm);
    }
  };
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const completedForm = getCompletedForm();
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
          <Button type="submit" variant="outlined" >
            Submit
          </Button>
          {onSubmitPartial ?
            <Button variant="outlined" onClick={handleSave} sx={{marginLeft: '1rem'}} color="secondary" >
              Save
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
