import { useReducer } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Sidebar from "./components/Sidebar";
import Main from "./components/Wrapper/Main";
import { AppContext, AppDispatchContext } from "./context/AppContext";
import { documentReducer, initialDocuments } from "./reducer/document";

const App = (props: Props) => {
  const [documents, dispatch] = useReducer(documentReducer, initialDocuments);

  return (
    <AppContext value={documents}>
      <AppDispatchContext value={dispatch}>
        <Header />
        <Main>
          <Sidebar />
          <Editor />
          <Preview />
        </Main>
      </AppDispatchContext>
    </AppContext>
  );
};

export default App;
