import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlogListPage from './pages/BlogListPage';
import CustomerListPage from './pages/CustomerListPage';
import DashBoardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/customers" element={<CustomerListPage />} />
          {/* <Route path="/" element={<BlogPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
