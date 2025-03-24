import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserMd } from "react-icons/fa";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [patientDetails, setPatientDetails] = useState({
    name: "John Doe",
    age: "45",
    symptoms: "Fever and cough",
    diagnosis: "Suspected flu",
  });

  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const context = `
        Patient Details:
        Name: ${patientDetails.name || "Not provided"},
        Age: ${patientDetails.age || "Not provided"},
        Symptoms: ${patientDetails.symptoms || "Not provided"},
        Diagnosis: ${patientDetails.diagnosis || "Not provided"},
        Doctor's Query: ${input}
      `;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY", // Replace with your API key
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You are an AI assistant trained to answer medical questions based on patient data." },
            { role: "user", content: context },
          ],
        }),
      });

      const data = await response.json();
      const botMessage = {
        sender: "bot",
        text: data.choices?.[0]?.message?.content || "I couldn't provide an answer based on the given information.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "An error occurred. Please try again later." }]);
    }

    setInput("");
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Patient Details Section */}
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaUserMd size={20} className="me-2" />
              <h5 className="mb-0">Patient Info</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={patientDetails.name}
                  onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="text"
                  className="form-control"
                  value={patientDetails.age}
                  onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Symptoms</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={patientDetails.symptoms}
                  onChange={(e) => setPatientDetails({ ...patientDetails, symptoms: e.target.value })}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Diagnosis</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={patientDetails.diagnosis}
                  onChange={(e) => setPatientDetails({ ...patientDetails, diagnosis: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Doctor's Chat</h5>
            </div>
            <div className="card-body chat-window" style={{minHeight:'380px', overflowY: "auto", maxHeight: "400px" }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-primary text-white ms-auto" : "bg-light"}`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="card-footer d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your query..."
              />
              <button className="btn btn-primary" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
