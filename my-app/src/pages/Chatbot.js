import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  // const [patientDetails, setPatientDetails] = useState({
  //   name: "",
  //   age: "",
  //   symptoms: "",
  //   diagnosis: "",
  // });
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
      // Combine patient details with the user input
      const context = `
        Patient Details:
        Name: ${patientDetails.name || "Not provided"},
        Age: ${patientDetails.age || "Not provided"},
        Symptoms: ${patientDetails.symptoms || "Not provided"},
        Diagnosis: ${patientDetails.diagnosis || "Not provided"},
        Doctor's Query: ${input}
      `;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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", // Replace with your actual API key
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile", // Replace with the appropriate model ID
            messages: [
              {
                role: "system",
                content:
                  "You are an AI assistant trained to answer medical questions based on patient data.",
              },
              { role: "user", content: context },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Raw Response:", response);
console.log("Response Data:", data)
      // Process API response
      const botMessage = {
        sender: "bot",
        text:
          data.choices?.[0]?.message?.content ||
          "I couldn't provide an answer based on the given information.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with the Groq API:", error);
      const errorMessage = {
        sender: "bot",
        text: "An error occurred. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chatbot" style={styles.chatbot}>
      <h2 style={styles.header}>Health Chatbot</h2>
      <div>
        <h3>Patient Information</h3>
        <input
          type="text"
          placeholder="Name"
          value={patientDetails.name}
          onChange={(e) =>
            setPatientDetails({ ...patientDetails, name: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Age"
          value={patientDetails.age}
          onChange={(e) =>
            setPatientDetails({ ...patientDetails, age: e.target.value })
          }
          style={styles.input}
        />
        <textarea
          placeholder="Symptoms"
          value={patientDetails.symptoms}
          onChange={(e) =>
            setPatientDetails({ ...patientDetails, symptoms: e.target.value })
          }
          style={styles.input}
        />
        <textarea
          placeholder="Diagnosis"
          value={patientDetails.diagnosis}
          onChange={(e) =>
            setPatientDetails({ ...patientDetails, diagnosis: e.target.value })
          }
          style={styles.input}
        />
      </div>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatbot: {
    width: "400px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
  },
  chatWindow: {
    height: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  message: {
    padding: "8px",
    borderRadius: "8px",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
