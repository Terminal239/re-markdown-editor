import clsx from "clsx";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import useEditing from "../../hooks/use-editing";
import { toggleSidebar } from "../../reducer/ui";
import { IconMenu, IconXMark } from "../Icons";
import Button from "../Reusable/Button";
import DocumentInfo from "./DocumentInfo";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const editing = useEditing();

  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  return (
    <>
      <header className="flex items-center bg-gray-100 lg:gap-4">
        <Button
          tooltipMessage="Toggle Sidebar"
          onClick={() => toggleSidebar(uiDispatch)}
          icon={isSidebarOpen ? IconXMark : IconMenu}
          className={clsx(
            "absolute size-[40px] bg-gray-700 md:static",
            isSidebarOpen && "max-md:translate-x-[196px]",
          )}
        />
        <span className="hidden font-bold tracking-[8px] uppercase lg:inline">Markdown</span>
        {editing !== null && <DocumentInfo editing={editing} />}
        {editing !== null && <HeaderActions editing={editing} />}
      </header>
    </>
  );
};

export default Header;
