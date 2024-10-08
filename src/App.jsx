import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import SignInPage from "./Pages/SignIn";
import SignUpPage from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import MoreDetailsFound from "./Components/MoreDetails/MoreDetailsFound";
import ShowAllLost from "./Components/ShowAllPage/ShowAllLost";
import ShowAllFound from "./Components/ShowAllPage/ShowAllFound";
// import "./index.css"
// import "./App.css";
const App = () => {
  const isLogin = localStorage.getItem("isLogin") === "true";
  useEffect(() => {
    let docTitle = document.title;

    const onBlur = () => {
      document.title = "Come Back";
    };

    const onFocus = () => {
      document.title = docTitle;
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignInPage />} />
          <Route exact path="/sign-up" element={<SignUpPage />} />
          <Route
            exact
            path="/profile"
            element={isLogin ? <Profile /> : <Navigate to="/sign-in" />}
          />
          <Route path="/detailsfound/:id" element={<MoreDetailsFound />} />
          <Route
            exact
            path="/allfound"
            element={isLogin ? <ShowAllFound /> : <Navigate to="/sign-in" />}
          />
          <Route
            exact
            path="/alllost"
            element={isLogin ? <ShowAllLost /> : <Navigate to="/sign-in" />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
