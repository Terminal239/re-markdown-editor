import clsx from "clsx";
import { resetSelectedNode } from "../../actions/state";
import RenderFileTree from "./RenderFileTree";
import SidebarActions from "./SidebarActions";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  const handleSidebarClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;

    await resetSelectedNode();
  };

  return (
    <>
      <aside
        onClick={handleSidebarClick}
        id="sidebar"
        className={clsx(
          "absolute inset-y-0 flex w-[196px] shrink-0 flex-col bg-gray-50 transition md:static md:w-[256px]",
          className,
        )}
      >
        <SidebarActions />
        <RenderFileTree parentId={-1} />
      </aside>
    </>
  );
};

export default Sidebar;
