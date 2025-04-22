import { useAppState } from "../../context/AppContext";
import MarkdownWrapper from "./MarkdownWrapper";

type Props = {};

const Preview = (props: Props) => {
  const { editing } = useAppState();

  return (
    <div className="flex-1 border border-l-0 p-2 overflow-y-auto">
      <article className="prose lg:prose-lg">
        <MarkdownWrapper content={editing.content} />
      </article>
    </div>
  );
};

export default Preview;
