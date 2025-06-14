import React, { useState } from 'react';
import '../styles/StudentList.css';

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', class: '10A' },
    { id: 2, name: 'Jane Smith', class: '10B' },
    { id: 3, name: 'Tom Hardy', class: '10C' },
    { id: 4, name: 'Emma Watson', class: '10D' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editData, setEditData] = useState({ name: '', class: '' });

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditData({ name: student.name, class: student.class });
    setShowModal(true);
  };

  const openInsertModal = () => {
    setSelectedStudent(null);
    setEditData({ name: '', class: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const saveEdit = () => {
    if (!editData.name || !editData.class) return alert('Please fill in all fields.');

    if (selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id ? { ...s, ...editData } : s
        )
      );
    } else {
      const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        ...editData,
      };
      setStudents([...students, newStudent]);
    }
    closeModal();
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="student-page">
      <div className="student-header">
        <h3 className=" nameh3">Student List</h3>
        <button className="btn btn-primary" onClick={openInsertModal}>
          <i className="fas fa-plus me-2"></i> Add Student
        </button>
      </div>

      <table className="student-table col-8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>
                <button className="edit-btn" onClick={() => openEditModal(s)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="delete-btn" onClick={() => deleteStudent(s.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-fade show">
          <div className="modal-content">
            <h4>{selectedStudent ? 'Edit Student' : 'Add Student'}</h4>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="text"
              value={editData.class}
              onChange={(e) => setEditData({ ...editData, class: e.target.value })}
              placeholder="Class"
            />
            <div className="modal-footer">
              <button onClick={closeModal} className="cancel-btn">Cancel</button>
              <button onClick={saveEdit} className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
