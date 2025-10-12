import { Box, Divider, Typography, TypographyProps } from "@mui/material";
import React, { FC } from "react";
import { HeaderElement } from "./Components";

export interface HeaderProps extends HeaderElement {
    disabled?: boolean;
}

const Header: FC<HeaderProps> = ({ text, variant = "h6" as TypographyProps["variant"], bold, italic, divider, border }) => {
    return (
        <React.Fragment>
            <Box sx={{ marginY: "2.5rem", borderBottom: border ? "1px solid black" : "" }}>
                <Typography
                    variant={variant as TypographyProps["variant"]}
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
