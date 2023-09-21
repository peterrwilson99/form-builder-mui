import { Box, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react'

export interface HeaderProps {
    text: string;
    variant?: TypographyProps['variant'];
}

const Header: FC<HeaderProps> = ({ text, variant = 'h6' }) => {
    return (
        <Box sx={{marginY: "16px"}}>
            <Typography variant={variant} gutterBottom sx={{wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%"}}>
                {text}
            </Typography>
        </Box>
    )
}

export default Header
