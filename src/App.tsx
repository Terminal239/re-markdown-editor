import { useReducer } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Sidebar from "./components/Sidebar";
import Main from "./components/Wrapper/Main";
import { DispatchContext, StateContext } from "./context/AppContext";
import { UIContext, UIDispatchContext } from "./context/UIContext";
import { documentReducer, state } from "./reducer/document";
import { initialUIState, uiReducer } from "./reducer/ui";

type Props = {};

const App = (props: Props) => {
  const [documents, appDispatch] = useReducer(documentReducer, state);
  const [ui, uiDispatch] = useReducer(uiReducer, initialUIState);

  return (
    <UIContext value={ui}>
      <UIDispatchContext value={uiDispatch}>
        <StateContext value={documents}>
          <DispatchContext value={appDispatch}>
            <div className="flex h-full">
              {ui.isSidebarOpen && <Sidebar />}
              <div className="flex-1 flex flex-col">
                <Header />
                <Main>
                  {ui.isEditorExpanded && <Editor />}
                  <Preview />
                </Main>
              </div>
            </div>
          </DispatchContext>
        </StateContext>
      </UIDispatchContext>
    </UIContext>
  );
};

export default App;
