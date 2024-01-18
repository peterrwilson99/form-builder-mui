import { Box, Divider as MUIDivider, Chip } from '@mui/material';
import { FC } from 'react'

export interface DividerProps {
    variant?: 'fullWidth' | 'inset' | 'middle';
    text?: string;
    textAlign?: 'left' | 'center' | 'right';
}

const Divider: FC<DividerProps> = ({ variant = 'fullWidth', text, textAlign }) => {
    return (
        <Box sx={{marginY: "2.5rem"}}>
            <MUIDivider variant={variant} textAlign={textAlign} >
                {text ? <Chip label={text} size="small" /> : null}
            </MUIDivider>
        </Box>
    )
}

export default Divider
