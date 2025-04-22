import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

function MarkdownWrapper({ content }: Props) {
  return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
}

export default MarkdownWrapper;
