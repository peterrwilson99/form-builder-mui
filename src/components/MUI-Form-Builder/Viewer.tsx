import React, { FC, FormEvent, useState } from "react";
import { Button } from "@mui/material";

import { Components } from "./elements/Components";

interface Element {
  id: number;
  type: keyof typeof Components;
  [key: string]: any;
}

interface ViewerProps {
  form?: Element[];
  onSubmit?: (formValues: any) => void;
  preview: Boolean;
}

const Viewer: FC<ViewerProps> = ({ form, onSubmit, preview }) => {
  const [formValues, setFormValues] = useState({});
  const elements = form ?? [];
  const handleChange = (id: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {elements.map((element, index) => {
        const Component = Components[element.type] as FC<any>;
        return <Component key={index} onChange={handleChange} {...element}/>;
      })}
      {preview === false ? 
        <Button type="submit" variant="outlined">
          Submit
        </Button>
        :
        <></>
      }
    </form>
  );
};

export default Viewer;
