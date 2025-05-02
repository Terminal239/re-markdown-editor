import { useReducer } from "react";
import { Toaster } from "react-hot-toast";
import Editor from "./components/Editor";
import Header from "./components/Header";
import useActiveFile from "./components/hooks/use-active-file";
import Preview from "./components/Preview";
import EmptyState from "./components/Reusable/EmptyState";
import Sidebar from "./components/Sidebar";
import Main from "./components/Wrapper/Main";
import { UIContext, UIDispatchContext } from "./context/UIContext";
import { loadFromLocalStorage } from "./lib/localStorage";
import { initialUIState, uiReducer } from "./reducer/ui";

const App = () => {
  const [ui, uiDispatch] = useReducer(uiReducer, loadFromLocalStorage("uiState") ?? initialUIState);
  const editing = useActiveFile();

  return (
    <UIContext value={ui}>
      <UIDispatchContext value={uiDispatch}>
        <div className="flex h-full">
          {ui.isSidebarOpen && <Sidebar />}
          <div className="flex-1 flex flex-col">
            <Header />
            <Main>
              {editing !== null ? (
                <>
                  <Editor />
                  <Preview />
                </>
              ) : (
                <EmptyState />
              )}
            </Main>
          </div>
        </div>
        <Toaster />
      </UIDispatchContext>
    </UIContext>
  );
};

export default App;
