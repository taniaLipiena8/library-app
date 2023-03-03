import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Home from "./components/Home";
import BookDetail from "./components/BookDetail"
import Cart from "./components/Cart";
import { PrivateRoute } from "./components/PrivateRoute";
import UserContextProvider from "./context/UserContext";


function App() {
  const auth = localStorage.getItem('user_id')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!auth) {
      navigate('/login', { replace: true })
    }

    if (pathname.toLowerCase().includes('/login') || pathname === '/') {
      navigate('/book')
    }

  }, [])

  return (
    <div className="App">
      <UserContextProvider>
        <Nav />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/book" element={<PrivateRoute><Home  /></PrivateRoute>} />
          <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="*" element={<Navigate to='/book' replace />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
