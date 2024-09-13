import { Divider, IconButton, ListItemIcon, MenuItem, MenuList, Popover, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Components } from "../elements/Components";
import { useState } from "react";

export interface InsertAtProps {
    handleAddComponentAtIndex: (component: keyof typeof Components) => void;
}

function InsertAt(props: InsertAtProps) {
    const { handleAddComponentAtIndex } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuButtonClick = (component: keyof typeof Components) => {
        handleAddComponentAtIndex(component);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Divider>
            <Tooltip title="Insert Element Here">
                <IconButton onClick={handleClick}>
                    <Add />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <MenuList>
                    {Object.keys(Components).map((component, index) => (
                        <MenuItem key={index} onClick={() => handleMenuButtonClick(component as keyof typeof Components)}>
                            {component}
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </Divider>
    );
}

export default InsertAt;
