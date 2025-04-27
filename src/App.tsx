import { useReducer } from "react";
import { Toaster } from "react-hot-toast";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Sidebar from "./components/Sidebar";
import Main from "./components/Wrapper/Main";
import { DispatchContext, StateContext } from "./context/AppContext";
import { UIContext, UIDispatchContext } from "./context/UIContext";
import { documentReducer, state } from "./reducer/document";
import { initialUIState, uiReducer } from "./reducer/ui";
import { loadFromLocalStorage } from "./utils/localStorage";

const App = () => {
  const [fileStructure, appDispatch] = useReducer(documentReducer, loadFromLocalStorage("appState") ?? state);
  const [ui, uiDispatch] = useReducer(uiReducer, loadFromLocalStorage("uiState") ?? initialUIState);

  return (
    <UIContext value={ui}>
      <UIDispatchContext value={uiDispatch}>
        <StateContext value={fileStructure}>
          <DispatchContext value={appDispatch}>
            <div className="flex h-full">
              {ui.isSidebarOpen && <Sidebar />}
              <div className="flex-1 flex flex-col">
                <Header />
                <Main>
                  <Editor />
                  <Preview />
                </Main>
              </div>
            </div>
            <Toaster />
          </DispatchContext>
        </StateContext>
      </UIDispatchContext>
    </UIContext>
  );
};

export default App;
