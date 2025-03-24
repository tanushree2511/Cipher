import React, { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Handle input changes for the new patient form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  // Add new patient to the patient list
  const addPatient = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.condition) {
      setFormError("Please fill all fields!");
      return;
    }

    setPatients((prevPatients) => [...prevPatients, newPatient]);
    setIsFormSubmitted(true);
    setNewPatient({
      name: "",
      age: "",
      gender: "",
      condition: "",
    });
    setFormError("");
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Doctor's Dashboard</h2>
        <p>Manage patient records, appointments, and more.</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search for patient records"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="statistics-section">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{patients.length}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Appointments</h3>
          <p>5</p>
        </div>
      </div>

      <div className="actions-section">
        <button className="action-button" data-bs-toggle="modal" data-bs-target="#addPatientModal">
          Add New Patient
        </button>
      </div>

      {/* Add Patient Modal */}
      <div
        className="modal fade"
        id="addPatientModal"
        tabIndex="-1"
        aria-labelledby="addPatientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPatientModalLabel">
                Add New Patient
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {isFormSubmitted && (
                <div className="alert alert-success" role="alert">
                  Patient added successfully!
                </div>
              )}
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}
              <form onSubmit={addPatient}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Patient Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newPatient.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter patient's full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      value={newPatient.age}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter patient's age"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      value={newPatient.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <input
                      type="text"
                      className="form-control"
                      id="condition"
                      name="condition"
                      value={newPatient.condition}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter patient's medical condition"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Add Patient
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Display Patient Records */}
      <div className="patient-records">
        <h3>Patient Records</h3>
        <div className="patient-list">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <div className="patient-card" key={index}>
                <h4>{patient.name}</h4>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Condition:</strong> {patient.condition}</p>
              </div>
            ))
          ) : (
            <p>No patients found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
