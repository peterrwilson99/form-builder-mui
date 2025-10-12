import { Box, Divider as MUIDivider, Chip } from "@mui/material";
import { FC } from "react";
import { DividerElement } from "./Components";

export interface DividerProps extends DividerElement {
    // No additional props needed for Divider
}

const Divider: FC<DividerProps> = ({ variant = "fullWidth", text, textAlign }) => {
    return (
        <Box sx={{ marginY: "2.5rem" }}>
            <MUIDivider variant={variant} textAlign={textAlign}>
                {text ? <Chip label={text} size="small" /> : null}
            </MUIDivider>
        </Box>
    );
};

export default Divider;
