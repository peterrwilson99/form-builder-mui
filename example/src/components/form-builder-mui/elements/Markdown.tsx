import React, { FC } from "react";
import RenderMarkdown from "../helperComponents/RenderMarkdown";
import { DependentProps } from "./Components";

export interface MarkdownProps {
    text: string;
    dependentProperties?: DependentProps;
}

const Markdown: FC<MarkdownProps> = ({ text }) => {
    return (
        <React.Fragment>
            <RenderMarkdown markdown={text} />
        </React.Fragment>
    );
};

export default Markdown;
