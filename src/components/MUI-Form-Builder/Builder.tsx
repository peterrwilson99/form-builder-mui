import React, { FC, useState } from 'react'
import Toolbox from './Toolbox';
import { ComponentDefaults, Components } from './elements/Components';
import { Box, Button, Drawer, IconButton, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import Properties from './Properties';
import Viewer from './Viewer';

interface Element {
    id: number;
    type: keyof typeof Components;
    [key: string]: any; // This can be improved by defining more explicit types
}

interface BuilderProps {
    form?: Element[];
    saveForm?: (form: Element[]) => void;
}


const Builder: FC<BuilderProps> = (props) => {
    const { form, saveForm } = props
    const [elements, setElements] = useState(form ?? [])
    const [nextId, setNextId] = useState(1);
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
    
    const onAddComponent = (componentType: keyof typeof Components) => {
        const componentPropertiesCurrent = ComponentDefaults[componentType as keyof typeof ComponentDefaults];
        const newElement = {
            id: nextId,
            type: componentType,
            ...componentPropertiesCurrent,
        };
        
        setElements((oldElements) => [...oldElements, newElement]);
        setNextId(nextId + 1);
    };

    const editElement = (id: number, properties: any) => {
        const newElements = [...elements];
        const index = newElements.findIndex((element) => element.id === id);
        const elementToEdit = newElements[index];
        
        for(const [key, value] of Object.entries(properties)) {
            elementToEdit[key] = value;
        }
        newElements[index] = elementToEdit;
        setElements(newElements);
    };

    const deleteElement = (id: number) => {
        const newElements = [...elements];
        const index = newElements.findIndex((element) => element.id === id);
        newElements.splice(index, 1);
        setElements(newElements);
    };

    const openDrawer = (elementId: number) => {
        const index = elements.findIndex(element => element.id === elementId);
        setActiveElement(index);
        setDrawerOpen(true);
    };

    const handleModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: string,
      ) => {
        if(newMode !== null) {
            setMode(newMode);
        }
      };
    
    
    const closeDrawer = () => setDrawerOpen(false);

    return (
        <div className="builder">
            <Box className="preview" justifyContent="flex-end">
                <ToggleButtonGroup
                    color="primary"
                    value={mode}
                    exclusive
                    onChange={handleModeChange}
                    >
                    <ToggleButton value="builder">Builder</ToggleButton>
                    <ToggleButton value="preview" disabled={elements.length === 0}>Preview</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {mode === "builder" ?
                <div>
                    <div className="form-preview">
                        {elements.map((element, index) => {
                            const Component = Components[element.type as keyof typeof Components];
                            
                            return (
                                <Paper elevation={2} sx={{ p: 1, my: 1 }} >
                                    <div>
                                        <Box sx={{display: "flex", justifyContent: "end", marginBottom: "-35px"}}>
                                            <IconButton onClick={() => openDrawer(element.id)}> 
                                                <SettingsIcon />
                                            </IconButton>
                                            <IconButton onClick={() => moveElementUp(index)} disabled={index === 0}>
                                                <ArrowUpwardIcon />
                                            </IconButton>
                                            <IconButton onClick={() => moveElementDown(index)} disabled={index === elements.length - 1}>
                                                <ArrowDownwardIcon />
                                            </IconButton>
                                            <IconButton onClick={() => deleteElement(element.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                        <Component {...element as any} disabled={true} />
                                    </div>
                                </Paper>
                            );
                        })}
                    </div>
                    <div className="toolbox">
                        <Toolbox onAddComponent={onAddComponent}/>
                    </div>
                    <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
                        <IconButton onClick={closeDrawer} style={{ position: 'absolute', left: 0, margin: '10px' }}>
                            <CloseIcon />
                        </IconButton>
                        {
                            elements[activeElement] ?
                                <Properties element={elements[activeElement]} editElement={editElement} />
                                :
                                <></>
                        }
                    </Drawer>
                    <Button sx={{marginY: "16px"}} onClick={() => { saveForm ? saveForm(elements) : console.log(elements) }} variant="outlined">
                        Save Form
                    </Button>
                </div>
                :
                <Viewer form={elements} preview={true}/>
            }
            {/* {mode === "preview" ? 
                <Viewer form={elements} preview={true}/>
                :
                <></>
            } */}
        </div>
    );
}

export default Builder
