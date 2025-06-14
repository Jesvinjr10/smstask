import React, { useState } from 'react';
import '../styles/MarksList.css';

export default function MarksList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Jesvin L jose', class: '10A', teacher: 'Mr. Albert', subject: 'Math', marks: 85 },
    { id: 2, name: 'Joshna L jose', class: '10A', teacher: 'Mr. Jose', subject: 'Science', marks: 90 },
    { id: 3, name: 'Sharmi', class: '10B', teacher: 'Mrs. Jerith', subject: 'English', marks: 78 },
    { id: 4, name: 'Reejin', class: '10C', teacher: 'Mrs. Wilson', subject: 'History', marks: 88 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [formData, setFormData] = useState({
    id: null,
    name: '', class: '', teacher: '', subject: '', marks: ''
  });

  const openModal = (type, student = null) => {
    setModalType(type);
    if (student) {
      setFormData(student);
    } else {
      setFormData({ id: null, name: '', class: '', teacher: '', subject: '', marks: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setFormData({ id: null, name: '', class: '', teacher: '', subject: '', marks: '' });
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (modalType === 'edit') {
      setStudents(students.map(s => s.id === formData.id ? { ...formData, marks: parseInt(formData.marks) } : s));
    } else {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      const newStudent = { ...formData, id: newId, marks: parseInt(formData.marks) };
      setStudents([...students, newStudent]);
    }
    closeModal();
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filteredData = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marks-page">
      <div className="marks-header">
        <h3 style={{
          margin: 0, color: '#620a98', fontSize: '50px', fontWeight: 'bold',
          textTransform: 'uppercase', letterSpacing: '1px'
        }}>Marks Details
        </h3>

        <button className="btn btn-primary" onClick={() => openModal('add')}>
          <i className="fas fa-plus me-2"></i> Insert Marks
        </button>
      </div>

      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Class</th><th>Teacher</th><th>Subject</th><th>Marks</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.teacher}</td>
              <td>{s.subject}</td>
              <td>{s.marks}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openModal('edit', s)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(s.id)}>
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
            <h5>{modalType === 'edit' ? 'Edit' : 'Add'} Marks</h5>
            <input type="text" placeholder="Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" placeholder="Class" value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
            <input type="text" placeholder="Teacher" value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })} />
            <input type="text" placeholder="Subject" value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            <input type="number" placeholder="Marks" value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })} />
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              <button className="save-btn" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
