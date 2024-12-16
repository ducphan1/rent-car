import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../asset/style/Login.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
      role: "guest",
    };

    try {
      const response = await axios.post(
        "https://675bd7cb9ce247eb1937944f.mockapi.io/user",
        newUser
      );

      if (response.status === 201) {
        setSuccessMessage("Đăng ký thành công!");
        setErrorMessage("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);

        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi! Vui lòng thử lại.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="auth-input-group">
          <i className="fas fa-user auth-icon"></i>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <i className="fas fa-envelope auth-icon"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <i className="fas fa-lock auth-icon"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
