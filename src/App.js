import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./pages/QuizScreen";
import EndScreen from "./pages/EndScreen";
import { theme } from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/end" element={<EndScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
