import React, { useState } from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import Viewer from './components/form-builder-mui/Viewer';
import Builder from './components/form-builder-mui/Builder';  // assuming Builder component is exported from here
import { Form1, FormExamples, FormExamplesKeys } from './components/FormExamples';
import { Components } from "./components/form-builder-mui/elements/Components";
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";

interface Element {
  id: number;
  type: keyof typeof Components;
  [key: string]: any;
}

function App() {
  const [value, setValue] = useState(0);
  const [form, setForm] = useState(Form1 as Element[]);
  const [formSelect, setFormSelect] = useState("Form1");

  const saveForm = (builtForm: Element[]) => {
    console.log(JSON.stringify(builtForm));
  }

  const handleFormChange = (e: any) => {
    setFormSelect(e.target.value);
    
    const selectedForm = FormExamples[e.target.value as FormExamplesKeys] as Element[] ?? [];
    setForm(selectedForm);
  }

  const handleSubmit = (formSubmission: any) => {
    console.log(JSON.stringify(formSubmission));
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Container maxWidth="md" sx={{marginTop: "3rem"}}>
        <FormControl sx={{minWidth: "300px"}}>
              <InputLabel id="form-select">Select Form</InputLabel>
              <Select
                  labelId="Select Form"
                  value={formSelect}
                  onChange={handleFormChange}
                  label="Select Form"
              >
                {
                  Object.keys(FormExamples).map((formExample: string, index: number) => (
                      <MenuItem key={index} value={formExample}>{formExample}</MenuItem>
                  ))
                }
              </Select>
          </FormControl>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Viewer" />
            <Tab label="Viewer disabled" />
            <Tab label="Builder" />
            <Tab label="Builder of old Form" />
          </Tabs>
        </Box>
        <Box>
          {value === 0 && <Viewer form={form} onSubmit={handleSubmit} onSubmitPartial={handleSubmit} preview={false} />}
          {value === 1 && <Viewer form={form} disabled={true} />}
          {value === 2 && <Builder saveForm={saveForm}/>}
          {value === 3 && <Builder form={form} saveForm = {saveForm} />}
        </Box>
      </Container>
    </div>
  );
}

export default App;
