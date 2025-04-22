import "./App.css";
import { NotesProvider } from "./context/NotesContext";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import EditNote from "./pages/EditNote";
import { ToastContainer } from "react-toastify";
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <>
      <NotesProvider>
        <Router>
          {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/note/:id" element={<NoteDetail />} />
            {/* <Route path="/note/:id" element={<NoteCard />} /> */}
          </Routes>
          {/* </Layout> */}
        </Router>
        <ToastContainer />
      </NotesProvider>
    </>
  );
}

export default App;
