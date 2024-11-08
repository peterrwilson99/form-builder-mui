import React, { FC } from "react";
import RenderMarkdown from "../helperComponents/RenderMarkdown";

export interface MarkdownProps {
    text: string;
}

const Markdown: FC<MarkdownProps> = ({ text }) => {
    return (
        <React.Fragment>
            <RenderMarkdown markdown={text} />
        </React.Fragment>
    );
};

export default Markdown;
