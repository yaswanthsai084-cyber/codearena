import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThemeProvider from "./context/ThemeProvider";

/**
 * Client side navigation keeps the previous scroll offset,
 * so every route change starts at the top of the new page.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        <ScrollToTop />

        <Routes>

          {/* CodeArena Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Course Library */}
          <Route path="/courses" element={<Courses />} />

          {/* One page per course card */}
          <Route
            path="/courses/:courseId"
            element={<CourseDetail />}
          />

          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Unknown URL */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;