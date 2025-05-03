import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconMenu, IconXMark } from "../Icons";
import Button from "../Reusable/Button";
import useActiveFile from "../hooks/use-active-file";
import DocumentInfo from "./DocumentInfo";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const activeFile = useActiveFile();

  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleToggleSidebar = () => uiDispatch({ type: "toggle-sidebar" });

  return (
    <>
      <header className="flex items-center lg:gap-4 bg-gray-100">
        <Button tooltipMessage="Toggle Sidebar" onClick={handleToggleSidebar} icon={isSidebarOpen ? IconXMark : IconMenu} className="size-[40px] bg-gray-700" />
        <span className="hidden lg:inline uppercase tracking-[8px] font-bold">Markdown</span>
        {activeFile !== null && <DocumentInfo activeFile={activeFile} />}
        {activeFile !== null && <HeaderActions activeFile={activeFile} />}
      </header>
    </>
  );
};

export default Header;
