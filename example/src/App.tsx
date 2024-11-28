import React, { useState } from "react";
import { Tabs, Tab, Box, Container, Snackbar, Alert } from "@mui/material";
import Viewer from "./components/form-builder-mui/Viewer";
import Builder from "./components/form-builder-mui/Builder";
import { Form1, FormExamples, FormExamplesKeys } from "./components/FormExamples";
import { Components } from "./components/form-builder-mui/elements/Components";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import InputJsonTab from "./components/InputJsonTab";

interface Element {
    id: number;
    type: keyof typeof Components;
    [key: string]: any;
}

function App() {
    const [value, setValue] = useState(0);
    const [form, setForm] = useState(Form1 as Element[]);
    const [formSelect, setFormSelect] = useState("Form1");
    const [alert, setAlert] = useState<"success" | "warning" | "info">("warning");
    const [open, setOpen] = useState(false);

    const saveForm = (builtForm: Element[]) => {
        console.log(JSON.stringify(builtForm));
        // paste the form to clipboard
        try {
            if (navigator && navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(JSON.stringify(builtForm));
        } catch (e) {
            console.error(e);
        }
        setAlert("info");
        setOpen(true);
    };

    const handleFormChange = (e: any) => {
        setFormSelect(e.target.value);

        const selectedForm = (FormExamples[e.target.value as FormExamplesKeys] as Element[]) ?? [];
        setForm(selectedForm);
    };

    const handleSubmit = (formSubmission: any) => {
        console.log(JSON.stringify(formSubmission));
        setAlert("success");
        setOpen(true);
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
        setAlert("warning");
    };

    return (
        <div className="App">
            <Container maxWidth="lg" sx={{ marginTop: "3rem" }}>
                <FormControl sx={{ minWidth: "300px" }}>
                    <InputLabel id="form-select">Select Form</InputLabel>
                    <Select labelId="Select Form" value={formSelect} onChange={handleFormChange} label="Select Form">
                        {Object.keys(FormExamples).map((formExample: string, index: number) => (
                            <MenuItem key={index} value={formExample}>
                                {formExample}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Viewer" />
                        <Tab label="Viewer disabled" />
                        <Tab label="Builder" />
                        <Tab label="Builder of old Form" />
                        <Tab label="Builder with JSON Input" />
                        <Tab label="Viewer with JSON Input" />
                    </Tabs>
                </Box>
                <Box>
                    {value === 0 && <Viewer form={form} onSubmit={handleSubmit} onSubmitPartial={saveForm} onAutoSave={saveForm} preview={false} />}
                    {value === 1 && <Viewer form={form} disabled={true} />}
                    {value === 2 && <Builder saveForm={saveForm} />}
                    {value === 3 && <Builder form={form} saveForm={saveForm} />}
                    {value === 4 && <InputJsonTab viewer={false} saveForm={saveForm} />}
                    {value === 5 && <InputJsonTab viewer={true} saveForm={saveForm} />}
                </Box>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alert} variant="filled" sx={{ width: "100%" }}>
                        {alert === "info" ? "Form Copied to Clipboard" : "Form Submission Successful"}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
}

export default App;
