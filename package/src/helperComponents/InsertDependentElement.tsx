import { IconButton, Tooltip } from "@mui/material";
import { AccountTree } from "@mui/icons-material";
import { Components } from "../elements/Components";
import { useState } from "react";
import AddElementPopover from "./AddElementPopover";

export interface InsertDependentElementProps {
    parentId: number;
    handleAddDependentElement: (parentId: number, component: keyof typeof Components) => void;
}

function InsertDependentElement(props: InsertDependentElementProps) {
    const { parentId, handleAddDependentElement } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAddComponentAtIndex = (component: keyof typeof Components) => {
        handleAddDependentElement(parentId, component);
    };

    return (
        <Tooltip title="Add Dependent Element" placement="top">
            <span>
                <IconButton onClick={handleClick}>
                    <AccountTree />
                </IconButton>
                <AddElementPopover anchorElement={anchorEl} handleAddComponentAtIndex={handleAddComponentAtIndex} anchorChange={setAnchorEl} />
            </span>
        </Tooltip>
    );
}

export default InsertDependentElement;
