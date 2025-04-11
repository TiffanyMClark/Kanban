import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null); // For error handling

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on submit
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      // Redirect or show success (if needed)
    } catch (err) {
      console.error("Failed to login", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Login;
