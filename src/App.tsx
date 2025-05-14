import { useReducer } from "react";
import { Toaster } from "react-hot-toast";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import Container from "./components/Reusable/Container";
import EmptyState from "./components/Reusable/EmptyState";
import Overlay from "./components/Reusable/Overlay";
import Sidebar from "./components/Sidebar";
import Main from "./components/Wrapper/Main";
import { UIContext, UIDispatchContext } from "./context/UIContext";
import useEditing from "./hooks/use-editing";
import { loadFromLocalStorage } from "./lib/localStorage";
import { initialUIState, uiReducer } from "./reducer/ui";

const App = () => {
  const [uiState, uiDispatch] = useReducer(
    uiReducer,
    loadFromLocalStorage("uiState") ?? initialUIState,
  );
  const editing = useEditing();

  return (
    <UIContext value={uiState}>
      <UIDispatchContext value={uiDispatch}>
        {uiState.isSidebarOpen && <Overlay />}
        {uiState.isSidebarOpen && <Sidebar />}
        <Container>
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
        </Container>
        <Toaster />
      </UIDispatchContext>
    </UIContext>
  );
};

export default App;
