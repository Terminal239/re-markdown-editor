// @ts-nocheck

import clsx from "clsx";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

function MarkdownWrapper({ content }: Props) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = (className || "").match(/language-(\w+)/);
          return !inline && match ? (
            <SyntaxHighlighter children={String(children).replace(/\n$/, "")} style={dracula} customStyle={{ fontSize: "18px" }} language={match[1]} PreTag="div" {...props} />
          ) : (
            <code className={clsx(className, "text-lg")} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}

export default MarkdownWrapper;
