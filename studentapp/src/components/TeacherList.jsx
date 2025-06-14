import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import '../styles/TeacherList.css'; 
export default function TeacherList() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Mr. Smith', subject: 'Mathematics' },
    { id: 2, name: 'Ms. Johnson', subject: 'Science' },
    { id: 3, name: 'Mrs. Brown', subject: 'English' },
    { id: 4, name: 'Dr. Wilson', subject: 'History' },
  ]);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', subject: '' });

  const openModal = (type, teacher = { id: null, name: '', subject: '' }) => {
    setModalType(type);
    setFormData(teacher);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ id: null, name: '', subject: '' });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.subject) {
      return alert('Please fill in all fields.');
    }

    if (modalType === 'edit') {
      setTeachers(teachers.map((t) => (t.id === formData.id ? formData : t)));
    } else {
      const nextId = teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1;
      const newTeacher = { ...formData, id: nextId };
      setTeachers([...teachers, newTeacher]);
    }
    closeModal();
  };

  const deleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="teacher-list-heading">Teacher List</h3>
        <button className="btn btn-primary" onClick={() => openModal('add')}>
          <i className="bi bi-plus-lg me-2"></i>Add Teacher
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openModal('edit', t)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTeacher(t.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'edit' ? 'Edit' : 'Add'} Teacher
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
