import { useReducer, useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Sidebar from "./components/Sidebar";
import Main from "./components/Wrapper/Main";
import { DispatchContext, StateContext } from "./context/AppContext";
import { documentReducer, state } from "./reducer/document";

type Props = {};

const App = (props: Props) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [documents, dispatch] = useReducer(documentReducer, state);

  return (
    <StateContext value={documents}>
      <DispatchContext value={dispatch}>
        <Header sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
        <Main>
          {sidebarExpanded && <Sidebar />}
          <Editor />
          <Preview />
        </Main>
      </DispatchContext>
    </StateContext>
  );
};

export default App;
