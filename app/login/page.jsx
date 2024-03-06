"use client";
import "@styles/login.scss";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor"></img>
      <div className="login_content">
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            required
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          ></input>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
