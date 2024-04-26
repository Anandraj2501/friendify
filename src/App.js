import "./index.css"
import './App.css';
import Authentication from './Login/Authentication';
import MainContainer from './Main/MainContainer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalContextProvider } from "./utils/Context";


function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <Router>
          <Routes>
            <Route path="/login" exact element={<Authentication />} />
            <Route path="/*" element={<MainContainer />} />
          </Routes>
        </Router>
      </ModalContextProvider>
    </div>
  );
}

export default App;
