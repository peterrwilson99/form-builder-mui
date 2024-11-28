import { Box, Divider, Typography, TypographyProps } from "@mui/material";
import React, { FC } from "react";
import { DependentProps } from "./Components";

export interface HeaderProps {
    text: string;
    variant?: TypographyProps["variant"];
    bold?: boolean;
    italic?: boolean;
    divider?: boolean;
    border?: boolean;
    dependentProperties?: DependentProps;
}

const Header: FC<HeaderProps> = ({ text, variant = "h6", bold, italic, divider, border }) => {
    return (
        <React.Fragment>
            <Box sx={{ marginY: "2.5rem", borderBottom: border ? "1px solid black" : "" }}>
                <Typography
                    variant={variant}
                    fontStyle={italic ? "italic" : ""}
                    fontWeight={bold ? "bold" : ""}
                    sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        maxWidth: "100%",
                    }}
                >
                    {text}
                </Typography>
            </Box>
            {divider && <Divider sx={{ marginBottom: "1rem" }} />}
        </React.Fragment>
    );
};

export default Header;
