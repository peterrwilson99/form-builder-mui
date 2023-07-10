import { Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react'

interface HeaderProps {
    text: string;
    variant?: TypographyProps['variant'];
}

const Header: FC<HeaderProps> = ({ text, variant = 'h6' }) => {
    return (
        <div className="my-4">
            <Typography variant={variant} gutterBottom>
                {text}
            </Typography>
        </div>
    )
}

export default Header
