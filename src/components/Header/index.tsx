import { useUIDispatch, useUIState } from "../../context/UIContext";
import useActiveFile from "../../hooks/use-active-file";
import { IconMenu, IconXMark } from "../Icons";
import Button from "../Reusable/Button";
import DocumentInfo from "./DocumentInfo";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const activeFile = useActiveFile();

  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleToggleSidebar = () => uiDispatch({ type: "toggle-sidebar" });

  return (
    <>
      <header className="flex items-center bg-gray-100 lg:gap-4">
        <Button
          tooltipMessage="Toggle Sidebar"
          onClick={handleToggleSidebar}
          icon={isSidebarOpen ? IconXMark : IconMenu}
          className="size-[40px] bg-gray-700"
        />
        <span className="hidden font-bold tracking-[8px] uppercase lg:inline">Markdown</span>
        {activeFile !== null && <DocumentInfo activeFile={activeFile} />}
        {activeFile !== null && <HeaderActions activeFile={activeFile} />}
      </header>
    </>
  );
};

export default Header;
