import React from "react";
import { useParams } from "react-router-dom";

export default function PatientDetails() {
  let { id } = useParams();
  return (
    <div className="patient-details">
      <h2>Patient Details</h2>
      <p>Displaying details for patient ID: {id}</p>
    </div>
  );
}
