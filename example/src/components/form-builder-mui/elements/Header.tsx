import { Box, Divider, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react'

export interface HeaderProps {
    text: string;
    variant?: TypographyProps['variant'];
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

const Header: FC<HeaderProps> = ({ text, variant = 'h6', bold, italic, underline }) => {
    return (
        <Box sx={{marginY: "2.5rem"}}>
            <Typography 
                variant={variant} 
                fontStyle={italic ? 'italic' : ''} 
                fontWeight={bold ? 'bold' : ''}
                gutterBottom 
                sx={{
                    wordWrap: "break-word", 
                    overflowWrap: "break-word", 
                    maxWidth: "100%"
                }}
                >
                {text}
            </Typography>
            {underline && <Divider sx={{ marginBottom: "1rem" }}/>}
        </Box>
    )
}

export default Header
