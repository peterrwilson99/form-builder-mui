import React, { useState } from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import Viewer from './components/MUI-Form-Builder/Viewer';
import Builder from './components/MUI-Form-Builder/Builder';  // assuming Builder component is exported from here
import { Form1 } from './components/Form1';
import { Components } from "./components/MUI-Form-Builder/elements/Components";

interface Element {
  id: number;
  type: keyof typeof Components;
  [key: string]: any;
}

function App() {
  const [value, setValue] = useState(0);
  const [formValues, setFormValues] = React.useState({});
  const [form, setForm] = React.useState(Form1);

  const handleChange = (id: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Viewer" />
            <Tab label="Builder" />
            <Tab label="Builder of old Form" />
          </Tabs>
        </Box>
        <Box>
          {value === 0 && <Viewer form={form as Element[]} onSubmit={handleSubmit} preview={false} />}
          {value === 1 && <Builder />}
          {value === 2 && <Builder form={form as Element[]} />}
        </Box>
      </Container>
    </div>
  );
}

export default App;
