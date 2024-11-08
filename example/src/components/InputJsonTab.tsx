import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import Viewer, { Element } from "./form-builder-mui/Viewer";
import Builder from "./form-builder-mui/Builder";

interface InputJsonTabProps {
    viewer?: boolean;
    saveForm?: (builtForm: Element[]) => void;
}

function InputJsonTab(props: InputJsonTabProps) {
    const { viewer, saveForm } = props;
    const [rawText, setRawText] = useState("");
    const [formValues, setFormValues] = useState<Element[]>([]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setRawText(e.target.value);
            setFormValues(JSON.parse(e.target.value) as Element[]);
        } catch (error) {
            setRawText(e.target.value);
            setFormValues([]);
        }
    };

    return (
        <Box sx={{ width: "100%", marginY: "2rem" }}>
            <TextField label="Input JSON" fullWidth value={rawText} onChange={handleTextChange} sx={{ marginBottom: "1rem" }} multiline />
            {viewer ? <Viewer form={formValues} onSubmit={saveForm} /> : <Builder form={formValues} saveForm={saveForm} />}
        </Box>
    );
}

export default InputJsonTab;
