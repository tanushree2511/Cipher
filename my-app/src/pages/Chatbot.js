import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
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
              { role: "user", content: input }, // Corrected the structure to match typical APIs
            ],
          }),
        }
      );

      const data = await response.json();

      // Check if the API response contains valid data
      const botMessage = {
        sender: "bot",
        text: data.choices?.[0]?.message?.content || "I couldn't understand that.",
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
          placeholder="Type your message..."
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
