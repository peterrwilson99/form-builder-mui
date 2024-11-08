import React, { FC, useState } from "react";
import Toolbox from "./Toolbox";
import { ComponentDefaults, Components } from "./elements/Components";
import { Box, Button, Drawer, Grid, IconButton, List, ListItem, Paper, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Properties from "./Properties";
import Viewer from "./Viewer";
import InsertAt from "./helperComponents/InsertAt";

export interface Element {
    id: number;
    type: keyof typeof Components;
    [key: string]: any; // This can be improved by defining more explicit types
}

export interface BuilderProps {
    form?: Element[];
    saveForm?: (form: Element[]) => void;
    scrollToNewElement?: boolean;
}

const Builder: FC<BuilderProps> = (props) => {
    const { form, saveForm, scrollToNewElement = true } = props;
    const [elements, setElements] = useState(form ?? []);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeElement, setActiveElement] = useState(-1);
    const [mode, setMode] = useState("builder");

    const moveElementUp = (index: any) => {
        if (index === 0) {
            return; // Already at the top
        }
        const newElements = [...elements];
        const element = newElements[index];
        newElements[index] = newElements[index - 1];
        newElements[index - 1] = element;
        setElements(newElements);
    };

    const moveElementDown = (index: any) => {
        if (index === elements.length - 1) {
            return; // Already at the bottom
        }
        const newElements = [...elements];
        const element = newElements[index];
        newElements[index] = newElements[index + 1];
        newElements[index + 1] = element;
        setElements(newElements);
    };

    const generateNextId = () => {
        let nextId = Math.floor(Math.random() * 1000000000);
        // ensure no duplicate ids
        while (elements.map((element) => element.id).includes(nextId)) {
            nextId = Math.floor(Math.random() * 1000000000);
        }
        return nextId;
    };

    const findIndexOfElementOrThrow = (id: number) => {
        const index = elements.findIndex((element) => element.id === id);
        if (index === -1) {
            throw new Error(`Element with id ${id} not found`);
        }
        return index;
    };

    const getCopyOfElementOrThrow = (id: number) => {
        const index = findIndexOfElementOrThrow(id);
        return { ...elements[index] };
    };

    const getNewComponent = (componentType: keyof typeof Components) => {
        const componentPropertiesCurrent = ComponentDefaults[componentType as keyof typeof ComponentDefaults];

        return {
            id: generateNextId(),
            type: componentType,
            ...componentPropertiesCurrent,
        };
    };

    const onAddComponent = (componentType: keyof typeof Components) => {
        const newElement = getNewComponent(componentType);
        const nextId = newElement.id;

        setElements((oldElements) => [...oldElements, newElement]);
        // scroll to element in view
        // wait for 50 ms then scroll to element
        if (!scrollToNewElement) return;
        setTimeout(() => {
            scrollToElement(nextId);
        }, 50);
    };

    // const addDependentElement = (parentId: number, componentType: keyof typeof Components) => {
    //     const newElements = [...elements];
    //     const newElement = getNewComponent(componentType);
    //     newElement.dependentProperties = {
    //         enabled: true,
    //         parentId: parentId,
    //         parentValue: "",
    //     };

    //     newElements.splice(parentIndex + 1, 0, newElement);
    //     setElements(newElements);
    // };

    const scrollToElement = (id: number) => {
        const element = document.getElementById(id ? id.toString() : "");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const duplicateComponent = (id: number) => {
        const newElements = [...elements];
        const index = findIndexOfElementOrThrow(id);
        const elementToDuplicate: any = getCopyOfElementOrThrow(id);
        const nextId = generateNextId();
        const newElement: Element = elementToDuplicate;
        newElement.id = nextId;
        newElements.splice(index + 1, 0, newElement);
        setElements(newElements);
    };

    const editElement = (id: number, properties: any) => {
        const newElements = [...elements];
        const index = findIndexOfElementOrThrow(id);
        const elementToEdit = getCopyOfElementOrThrow(id);

        for (const [key, value] of Object.entries(properties)) {
            elementToEdit[key] = value;
        }
        newElements[index] = elementToEdit;
        setElements(newElements);
    };

    const deleteElement = (id: number) => {
        let newElements = [...elements];
        const index = findIndexOfElementOrThrow(id);
        newElements.splice(index, 1);
        newElements = checkForDependencies(id, newElements);
        setElements(newElements);
    };

    const checkForDependencies = (id: number, newElements: any) => {
        for (const element of newElements) {
            if (element.dependentProperties?.enabled && element.dependentProperties?.parentId === id) {
                element.dependentProperties.enabled = false;
            }
        }
        return newElements;
    };

    const openDrawer = (elementId: number) => {
        const index = findIndexOfElementOrThrow(elementId);
        setActiveElement(index);
        setDrawerOpen(true);
    };

    const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    const insertAtIndexHandler = (index: number, component: keyof typeof Components) => {
        const ComponentToAdd = getNewComponent(component);
        const newElements = [...elements];
        newElements.splice(index + 1, 0, ComponentToAdd);
        setElements(newElements);
    };

    const closeDrawer = () => setDrawerOpen(false);

    return (
        <Box className="builder" sx={{ marginBottom: "2rem" }}>
            <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} md={9}>
                    <Box className="workspace">
                        {mode === "builder" ? (
                            <React.Fragment>
                                <Box className="form-preview">
                                    {elements.map((element, index) => {
                                        const Component = Components[element.type as keyof typeof Components];
                                        const isLastElement = index === elements.length - 1;
                                        return (
                                            <React.Fragment key={index}>
                                                <Paper elevation={2} sx={{ p: 1, my: 1 }} id={element.id ? element.id.toString() : ""}>
                                                    <Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "end",
                                                                marginBottom: "-25px",
                                                            }}
                                                        >
                                                            <Tooltip title="Properties" placement="top">
                                                                <span>
                                                                    <IconButton onClick={() => openDrawer(element.id)}>
                                                                        <SettingsIcon />
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                            <Tooltip title="Duplicate" placement="top">
                                                                <span>
                                                                    <IconButton onClick={() => duplicateComponent(element.id)}>
                                                                        <ContentCopyIcon />
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                            {/* <Tooltip title="Add Dependent Element" placement="top">
                                                                <span>
                                                                    <IconButton onClick={() => addDependentElement(element.id)}>
                                                                        <AccountTreeIcon />
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip> */}
                                                            <Tooltip title="Move Up" placement="top">
                                                                <span>
                                                                    <IconButton onClick={() => moveElementUp(index)} disabled={index === 0}>
                                                                        <ArrowUpwardIcon />
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                            <Tooltip title="Move Down" placement="top">
                                                                <span>
                                                                    <IconButton onClick={() => moveElementDown(index)} disabled={index === elements.length - 1}>
                                                                        <ArrowDownwardIcon />
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                            <Tooltip title="Delete" placement="top">
                                                                <span>
                                                                    <IconButton onClick={() => deleteElement(element.id)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </span>
                                                            </Tooltip>
                                                        </Box>
                                                        <Box
                                                            onClick={() => openDrawer(element.id)}
                                                            sx={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <Component {...(element as any)} disabled={true} />
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                                {!isLastElement && (
                                                    <Box className="my-2">
                                                        <InsertAt handleAddComponentAtIndex={(component) => insertAtIndexHandler(index, component)} />
                                                    </Box>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </Box>

                                <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
                                    <Box sx={{ marginTop: "3.5rem" }}>
                                        <Box sx={{ marginBottom: "3rem" }}>
                                            <IconButton
                                                onClick={closeDrawer}
                                                sx={{
                                                    position: "absolute",
                                                    left: 0,
                                                    margin: "10px",
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                        {elements[activeElement] ? (
                                            <Properties element={elements[activeElement]} editElement={editElement} allElements={elements} />
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                </Drawer>
                            </React.Fragment>
                        ) : (
                            <Viewer form={elements} preview={true} />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box
                        className="controls"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "1rem",
                            position: "sticky",
                            top: "5rem",
                            zIndex: 1,
                        }}
                    >
                        <ToggleButtonGroup color="primary" orientation="vertical" value={mode} exclusive onChange={handleModeChange}>
                            <ToggleButton value="builder">Builder</ToggleButton>
                            <ToggleButton value="preview" disabled={elements.length === 0}>
                                Preview
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Button
                            sx={{ marginY: "16px" }}
                            onClick={() => {
                                saveForm ? saveForm(elements) : console.log(elements);
                            }}
                            variant="outlined"
                        >
                            Save Form
                        </Button>
                        <Box
                            className="toolbox"
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Toolbox onAddComponent={onAddComponent} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Builder;
