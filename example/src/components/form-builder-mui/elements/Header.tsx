import { Box, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react'

export interface HeaderProps {
    text: string;
    variant?: TypographyProps['variant'];
}

const Header: FC<HeaderProps> = ({ text, variant = 'h6' }) => {
    return (
        <Box sx={{marginY: "16px"}}>
            <Typography variant={variant} gutterBottom>
                {text}
            </Typography>
        </Box>
    )
}

export default Header
