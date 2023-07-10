import React, { FC, useState } from "react";
import { Components } from "./elements/Components";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { Add } from "@mui/icons-material";

interface ToolboxProps {
    onAddComponent: (component: string) => void;
}

const Toolbox: FC<ToolboxProps> = ({ onAddComponent }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            className="toolbox"
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
        >
            {Object.keys(Components).map((component) => (
                <SpeedDialAction
                    key={component}
                    icon={<Add />}
                    tooltipTitle={component}
                    onClick={() => onAddComponent(component)}
                />
            ))}
        </SpeedDial>
    );
}

export default Toolbox;
