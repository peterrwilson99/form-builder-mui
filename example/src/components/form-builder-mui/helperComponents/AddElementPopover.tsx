import { MenuItem, MenuList, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { Components } from "../elements/Components";

export interface AddElementPopoverProps {
    handleAddComponentAtIndex: (component: keyof typeof Components) => void;
    anchorElement: HTMLButtonElement | null;
    anchorChange?: (element: HTMLButtonElement | null) => void;
}

function AddElementPopover(props: AddElementPopoverProps) {
    const { handleAddComponentAtIndex, anchorElement, anchorChange } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        setAnchorEl(anchorElement);
    }, [anchorElement]);

    const handleClose = () => {
        setAnchorEl(null);
        anchorChange && anchorChange(null);
    };

    const handleMenuButtonClick = (component: keyof typeof Components) => {
        handleAddComponentAtIndex(component);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
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
    );
}

export default AddElementPopover;
