import { Typography } from "@mui/material";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export interface RenderMarkdownProps {
    markdown: string | undefined;
}

export const ComponentMap: Partial<Components> = {
    h1: ({ children }) => (
        <Typography variant="h3" gutterBottom>
            {children}
        </Typography>
    ),
    h2: ({ children }) => (
        <Typography variant="h4" gutterBottom>
            {children}
        </Typography>
    ),
    h3: ({ children }) => (
        <Typography variant="h5" gutterBottom>
            {children}
        </Typography>
    ),
    h4: ({ children }) => (
        <Typography variant="h6" gutterBottom>
            {children}
        </Typography>
    ),
    h5: ({ children }) => (
        <Typography variant="h6" gutterBottom>
            {children}
        </Typography>
    ),
    h6: ({ children }) => (
        <Typography variant="h6" gutterBottom>
            {children}
        </Typography>
    ),
    p: ({ children }) => (
        <Typography variant="body1" gutterBottom>
            {children}
        </Typography>
    ),
};

function RenderMarkdown(props: RenderMarkdownProps) {
    const { markdown } = props;
    return markdown ? (
        <Markdown components={ComponentMap} remarkPlugins={[[remarkGfm]]}>
            {markdown}
        </Markdown>
    ) : (
        <></>
    );
}

export default RenderMarkdown;
