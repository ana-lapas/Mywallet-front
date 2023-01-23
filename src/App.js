import AuthProvider from "./Contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import Home from "./components/Home";
import Transaction from "./components/Transaction";
import { GlobalStyle } from "./globalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/transaction/:type" element={<Transaction />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
