import React, { useState } from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import Viewer from './components/MUI-Form-Builder/Viewer';
import Builder from './components/MUI-Form-Builder/Builder';  // assuming Builder component is exported from here
import { Form1 } from './components/Form1';
import { Form1Filled } from './components/Form1Filled';
import { Components } from "./components/MUI-Form-Builder/elements/Components";
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

  const handleFormChange = (e: any) => {
    if(e.target.value === "Form1"){
      setForm(Form1 as Element[]);
      setFormSelect("Form1");
    }else if(e.target.value === "Form1Filled"){
      setForm(Form1Filled as Element[]);
      setFormSelect("Form1Filled");
    }
  }

  const handleSubmit = (formSubmission: any) => {
    console.log(formSubmission);
    // save form to JSON file called recentForm.json in this directory
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
                <MenuItem value="Form1">
                    Form1
                </MenuItem>
                <MenuItem value="Form1Filled">
                    Form1Filled
                </MenuItem>
              </Select>
          </FormControl>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Viewer" />
            <Tab label="Builder" />
            <Tab label="Builder of old Form" />
          </Tabs>
        </Box>
        <Box>
          {value === 0 && <Viewer form={form} onSubmit={handleSubmit} preview={false} />}
          {value === 1 && <Builder />}
          {value === 2 && <Builder form={form} />}
        </Box>
      </Container>
    </div>
  );
}

export default App;
