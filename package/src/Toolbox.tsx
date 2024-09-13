import React, { FC, useState } from "react";
import { Components } from "./elements/Components";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { Add } from "@mui/icons-material";

export interface ToolboxProps {
    onAddComponent: (component: keyof typeof Components) => void;
}

const Toolbox: FC<ToolboxProps> = ({ onAddComponent }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            className="toolbox"
            icon={<SpeedDialIcon />}
            onClick={handleToggle}
            open={open}
            direction="down"
        >
            {Object.keys(Components).map((component) => (
                <SpeedDialAction
                    key={component}
                    icon={<Add />}
                    tooltipTitle={component}
                    tooltipOpen
                    onClick={() => {
                        onAddComponent(component as keyof typeof Components);
                        setOpen(false); // Close the SpeedDial after adding a component
                    }}
                />
            ))}
        </SpeedDial>
    );
}

export default Toolbox;
