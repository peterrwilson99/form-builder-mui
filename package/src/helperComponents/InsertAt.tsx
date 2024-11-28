import { Divider, IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Components } from "../elements/Components";
import { useState } from "react";
import AddElementPopover from "./AddElementPopover";

export interface InsertAtProps {
    handleAddComponentAtIndex: (component: keyof typeof Components) => void;
}

function InsertAt(props: InsertAtProps) {
    const { handleAddComponentAtIndex } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Divider>
            <Tooltip title="Insert Element Here">
                <IconButton onClick={handleClick}>
                    <Add />
                </IconButton>
            </Tooltip>
            <AddElementPopover anchorElement={anchorEl} handleAddComponentAtIndex={handleAddComponentAtIndex} anchorChange={setAnchorEl} />
        </Divider>
    );
}

export default InsertAt;
