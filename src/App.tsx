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
  const [uiState, uiDispatch] = useReducer(
    uiReducer,
    loadFromLocalStorage("uiState") ?? initialUIState,
  );
  const activeFile = useActiveFile();

  return (
    <UIContext value={uiState}>
      <UIDispatchContext value={uiDispatch}>
        <div className="flex h-full">
          {uiState.isSidebarOpen && <Sidebar />}
          <div className="flex flex-1 flex-col">
            <Header />
            <Main>
              {activeFile !== null ? (
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
