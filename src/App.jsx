import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/detailsfound/:id" element={<MoreDetailsFound />} />
          <Route exact path="/allfound" element={<ShowAllFound />} />
          <Route exact path="/alllost" element={<ShowAllLost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
