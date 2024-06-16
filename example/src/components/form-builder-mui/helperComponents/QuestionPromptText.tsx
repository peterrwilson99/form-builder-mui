import React, { FC } from 'react';
import { Typography } from '@mui/material';

interface QuestionPromptTextProps {
    prompt: string;
    required: boolean;
}

const QuestionPromptText: FC<QuestionPromptTextProps> = ({ prompt, required }) => (
    <Typography variant="body1" gutterBottom>
        {prompt} {required && <span style={{ color: 'red' }}>*</span>}
    </Typography>
);

export default QuestionPromptText;