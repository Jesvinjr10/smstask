import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import MarksList from './components/MarksList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/marks" element={<MarksList />} />
      </Routes>
    </Router>
  );
}

export default App;