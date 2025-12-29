import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wish from "./pages/Wish";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wish/:name" element={<Wish />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
         {/* PROTECTED */}
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
