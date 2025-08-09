import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import TestPage from './pages/TestPage';
import MatchPage from './pages/MatchPage';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/match" element={<MatchPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
