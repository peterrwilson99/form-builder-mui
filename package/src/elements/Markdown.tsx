import React, { FC } from "react";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { MarkdownElement } from "./Components";

export interface MarkdownProps extends MarkdownElement {
    // No additional props needed for Markdown
}

const Markdown: FC<MarkdownProps> = ({ text }) => {
    return (
        <React.Fragment>
            <RenderMarkdown markdown={text} />
        </React.Fragment>
    );
};

export default Markdown;
