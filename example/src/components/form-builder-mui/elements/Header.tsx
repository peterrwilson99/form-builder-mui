import { Box, Divider, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react'

export interface HeaderProps {
    text: string;
    variant?: TypographyProps['variant'];
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    divider?: boolean;
    border?: boolean;
}

const Header: FC<HeaderProps> = ({ text, variant = 'h6', bold, italic, underline, divider, border }) => {
    return (
        <React.Fragment>
            <Box sx={{marginY: "2.5rem", borderBottom: border ? '1px solid black' : ''}}>
                <Typography
                    variant={variant}
                    fontStyle={italic ? 'italic' : ''}
                    fontWeight={bold ? 'bold' : ''}
                    sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        maxWidth: "100%",
                        textDecoration: underline ? 'underline' : ''
                    }}
                    >
                    {text}
                </Typography>
            </Box>
            {divider && <Divider sx={{ marginBottom: "1rem" }}/>}
        </React.Fragment>
    )
}

export default Header
