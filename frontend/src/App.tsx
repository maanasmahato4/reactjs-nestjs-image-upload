import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";
import Navigation from "./components/Nav";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AddAlbum from "./pages/AddAlbum";



function App() {

  function useProtectedRoute(redirectTo = "/signin") {
    const { token, decodedToken } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!token || !decodedToken) {
        navigate(redirectTo, { replace: true });
      }
    }, [token, decodedToken, redirectTo]);
  
    return { token, decodedToken };
  }

  function ProtectedRoute({ element, redirectTo }: any) {
    const { token, decodedToken } = useProtectedRoute(redirectTo);
  
    if (!decodedToken) {
      return null; // or show a loading state if necessary
    }
  
    return token && decodedToken ? (
      element
    ) : (
      <Navigate to={redirectTo} replace />
    );
  }
  
  return (
    <AuthProvider>
      <Fragment>
        <Navigation />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={<Home />}
                redirectTo="/signin"
              />
            }
          />
          <Route
            path="/album"
            element={
              <ProtectedRoute
                element={<AddAlbum />}
                redirectTo="/signin"
              />
            }
          />
        </Routes>
      </Fragment>
    </AuthProvider>
  );
}


export default App;
